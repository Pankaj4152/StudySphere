"use client";

import type { Resource, Comment as CommentType } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Book,
  FileText,
  MessageSquare,
  Smile,
  Frown,
  Meh,
  Send,
  User,
  Heart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useTransition } from "react";
import { analyzeCommentSentiment } from "@/ai/flows/analyze-comment-sentiment";
import { useToast } from "@/hooks/use-toast";

const resourceTypeIcons: { [key: string]: React.ElementType } = {
  PYQ: FileText,
  Notes: Book,
  PDF: FileText,
};

const sentimentIcons: { [key: string]: React.ElementType } = {
  positive: Smile,
  negative: Frown,
  neutral: Meh,
};

const sentimentColors: { [key: string]: string } = {
  positive: "text-green-500",
  negative: "text-red-500",
  neutral: "text-gray-500",
};

function Comment({ comment }: { comment: CommentType }) {
  const SentimentIcon = sentimentIcons[comment.sentiment] || Meh;
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{comment.user}</p>
          <div className="flex items-center gap-1">
            <SentimentIcon className={`h-4 w-4 ${sentimentColors[comment.sentiment]}`} />
            <span className={`text-xs font-medium ${sentimentColors[comment.sentiment]}`}>
              {comment.sentiment.charAt(0).toUpperCase() + comment.sentiment.slice(1)}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{comment.comment}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          {new Date(comment.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [comments, setComments] = useState<CommentType[]>(resource.comments);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim().length < 5) {
        toast({ variant: "destructive", description: "Comment must be at least 5 characters long." });
        return;
    }

    startTransition(async () => {
      try {
        const result = await analyzeCommentSentiment({ comment: newComment });
        const newCommentObj: CommentType = {
          id: `c${comments.length + 1}`,
          user: "Anonymous",
          comment: newComment,
          timestamp: new Date().toISOString(),
          sentiment: result.sentiment.toLowerCase(),
        };
        setComments((prev) => [newCommentObj, ...prev]);
        setNewComment("");
        toast({ title: "Success", description: "Your comment has been posted!" });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "AI Analysis Failed",
          description: "Could not analyze comment sentiment. Please try again.",
        });
      }
    });
  };

  const ResourceIcon = resourceTypeIcons[resource.type] || Book;

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                    <ResourceIcon className="h-5 w-5 text-primary" />
                    {resource.title}
                </CardTitle>
                <CardDescription>{resource.subject}</CardDescription>
            </div>
            <Badge variant="secondary">{resource.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{resource.desc}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">Year: {resource.year}</Badge>
          <Badge variant="outline">Sem: {resource.semester}</Badge>
          <Badge variant="outline">Branch: {resource.branch}</Badge>
        </div>
        {/* Amazon affiliate link placeholder */}
        <a href="#" className="text-xs text-primary hover:underline mt-4 block">
            Buy related book on Amazon &rarr;
        </a>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Separator />
        <div className="w-full flex justify-between items-center">
            <Button onClick={() => setShowComments(!showComments)} variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                {showComments ? "Hide" : "Show"} Comments ({comments.length})
            </Button>
            <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
        </div>
        {showComments && (
          <div className="w-full space-y-4 pt-4">
            <form onSubmit={handleCommentSubmit} className="flex items-start gap-2">
              <Textarea
                placeholder="Add a public comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 text-sm"
                rows={1}
              />
              <Button type="submit" size="icon" disabled={isPending}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
