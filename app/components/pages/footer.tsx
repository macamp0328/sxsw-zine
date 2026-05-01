import ScrollURLUpdater from '@/app/components/scroll-url-updater';
import TrackedLink from '@/app/components/ui/tracked-link';
import { robotoCondensed } from '@/app/lib/fonts';

export default function Footer() {
  return (
    <div
      id="footer"
      className="texture-overlay flex min-h-screen snap-start snap-always flex-col items-center justify-center space-y-12 px-12 pb-12 pt-24 md:snap-align-none md:px-32 lg:px-44"
    >
      <ScrollURLUpdater urlSegment="footer" isRootSection />
      <div className="flex-col items-center justify-center text-center">
        <h1 className="py-4 text-center text-2xl text-main-text">
          You&apos;ve reached the end of the almost 50 sets.
        </h1>
        <p
          className={`mt-8 text-center text-lg text-sub-text ${robotoCondensed.className}`}
        >
          If you made it this far, you should probably go back and listen to
          some music.
        </p>
        <p
          className={`mt-8 text-center text-lg text-sub-text ${robotoCondensed.className}`}
        >
          Want to see the source code for this project? You can find it on
          GitHub. I am treating this as a sandbox, so it will continue to
          evolve.
        </p>
        <TrackedLink
          href="https://github.com/macamp0328/sxsw-zine"
          linkType="footerLink"
          className={`text-center text-lg text-sub-text underline ${robotoCondensed.className}`}
        >
          GitHub Repository
        </TrackedLink>
      </div>
      <div className="squiggle-texture-overlay relative mx-4 my-3 flex w-full flex-col items-center gap-4 border-4 border-sub-text bg-sub-background p-4 text-center md:p-6">
        <p className="max-w-5xl text-base text-main-text md:text-lg">
          I&apos;m looking for full-time product engineering or solutions
          architecture roles. I like the work where product judgment, hands-on
          engineering, integrations, observability, and partner-facing technical
          ownership all meet. AI helps me move faster, but I still keep the
          judgment, validation, and ownership close.
        </p>
        <div
          className={`flex flex-col items-center gap-3 text-base text-sub-text sm:flex-row sm:justify-center md:text-lg ${robotoCondensed.className}`}
        >
          <TrackedLink
            href="/resumes/camp-miles-product-engineer-resume.pdf"
            linkType="footerLink"
            className="button-texture-overlay border-2 border-sub-text bg-neutral-200 px-4 py-2 text-center font-bold text-main-text underline"
          >
            Product Engineer Resume
          </TrackedLink>
          <TrackedLink
            href="/resumes/camp-miles-solutions-architect-resume.pdf"
            linkType="footerLink"
            className="button-texture-overlay border-2 border-sub-text bg-neutral-200 px-4 py-2 text-center font-bold text-main-text underline"
          >
            Solutions Architect Resume
          </TrackedLink>
        </div>
      </div>
      <div className="flex-col items-center justify-center pb-4 sm:mt-8">
        <p
          className={`text-center text-lg text-sub-text  ${robotoCondensed.className}`}
        >
          Other places you can find me:{' '}
          <TrackedLink
            href="https://www.linkedin.com/in/milescamp/"
            linkType="footerLink"
            className="text-center text-lg font-bold underline"
          >
            linkedin
          </TrackedLink>
          {', '}
          <TrackedLink
            href="https://www.instagram.com/twitterlessmiles/"
            linkType="footerLink"
            className="text-center text-lg underline"
          >
            @twitterlessmiles
          </TrackedLink>
          , or we could just hang out like humans.
        </p>
      </div>
    </div>
  );
}
