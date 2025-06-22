import { Button } from "@/components/ui/button";
import { Coffee, Heart } from "lucide-react";

// A simple component for social links for cleaner code
const SocialLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
    {children}
  </a>
);

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container flex flex-col items-center justify-between gap-6 px-4 py-10 md:px-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ScholarSphere. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground max-w-md text-center md:text-left">
            Disclaimer: All resources are shared with permission or are freely available. Contact us at <a href="mailto:support@studyhub.com" className="underline">support@studyhub.com</a> for removal requests.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
           {/* Placeholder for a donation button */}
          <Button variant="outline">
            <Heart className="mr-2 text-red-500"/> Support us on Buy Me a Coffee
          </Button>
          <div className="flex items-center gap-4">
            <SocialLink href="https://twitter.com">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              <span className="sr-only">Twitter</span>
            </SocialLink>
            <SocialLink href="https://instagram.com">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.792 2.013 10.146 2 12.315 2zm-1.003 3.366a.846.846 0 100 1.692.846.846 0 000-1.692zm-2.062 2.378a3.536 3.536 0 117.072 0 3.536 3.536 0 01-7.072 0z" clipRule="evenodd" /><path d="M12 6.848a5.152 5.152 0 100 10.304 5.152 5.152 0 000-10.304z" /></svg>
              <span className="sr-only">Instagram</span>
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
