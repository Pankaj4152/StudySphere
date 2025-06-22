
"use client";

import { useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { logoutAndRedirectAction } from "./actions";
import { Loader2, LogOut } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export function LogoutButton() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAndRedirectAction();
            toast({ title: "You have been logged out." });
        });
    }

    return (
        <Button variant="outline" onClick={handleLogout} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
            Logout
        </Button>
    );
}
