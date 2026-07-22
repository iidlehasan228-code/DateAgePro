import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line dark:border-line-dark">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <span className="font-display text-base font-bold">
              DateAge<span className="text-accent">Pro</span>
            </span>
            <p className="mt-2 text-sm text-muted dark:text-muted-dark">
              DateAgePro.com — a free, private age calculator. Nothing is stored beyond an
              anonymous calculation log used to improve the tool.
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div>
              <h4 className="mb-3 font-semibold text-muted dark:text-muted-dark">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-muted dark:text-muted-dark">Follow</h4>
              <div className="flex gap-3">
                <a href="#" aria-label="GitHub" className="hover:text-accent transition-colors"><Github size={18} /></a>
                <a href="#" aria-label="Twitter / X" className="hover:text-accent transition-colors"><Twitter size={18} /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-accent transition-colors"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line dark:border-line-dark pt-6 text-xs text-muted dark:text-muted-dark">
          © {new Date().getFullYear()} DateAgePro.com. Built with Next.js, Tailwind CSS, and Supabase.
        </div>
      </div>
    </footer>
  );
}
