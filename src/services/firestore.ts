import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type { Resource, Syllabus, Comment } from "@/lib/data";
import type { ResourceFormData } from "@/lib/schemas";

// Since Timestamps returned from Firestore are not directly serializable,
// we need a helper to convert them.
const convertDocTimestamps = (data: DocumentData) => {
    const convertedData: { [key: string]: any } = {};
    for (const key in data) {
        if (data[key] && typeof data[key].toDate === 'function') {
            convertedData[key] = data[key].toDate().toISOString();
        } else {
            convertedData[key] = data[key];
        }
    }
    return convertedData;
};

export async function getResources(): Promise<Resource[]> {
    try {
        const resourcesCol = collection(db, "resources");
        const resourceSnapshot = await getDocs(resourcesCol);
        
        const resources = resourceSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const commentsData = data.comments || [];
            
            const comments: Comment[] = commentsData.map((c: any) => {
                 if (c.timestamp && typeof c.timestamp.toDate === 'function') {
                    return { ...c, timestamp: c.timestamp.toDate().toISOString() };
                }
                return c;
            });

            return {
                id: doc.id,
                ...convertDocTimestamps(data),
                comments,
            } as Resource;
        });
        return resources;
    } catch (error) {
        console.error("Error fetching resources, you might need to configure Firestore and add data.", error);
        return [];
    }
}

export async function getSyllabus(): Promise<Syllabus[]> {
    try {
        const syllabusCol = collection(db, "syllabus");
        const syllabusSnapshot = await getDocs(syllabusCol);
        const syllabusList = syllabusSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            } as Syllabus;
        });
        return syllabusList;
    } catch (error) {
        console.error("Error fetching syllabus, you might need to configure Firestore and add data.", error);
        return [];
    }
}

export async function addResource(data: ResourceFormData): Promise<{ success: boolean; message: string }> {
    try {
        await addDoc(collection(db, "resources"), {
            ...data,
            comments: [], // Start with no comments
            createdAt: serverTimestamp(),
        });
        return { success: true, message: "Resource added successfully!" };
    } catch (error) {
        console.error("Error adding resource: ", error);
        return { success: false, message: "Failed to add resource." };
    }
}
