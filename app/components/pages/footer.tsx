import { robotoCondensed } from '@/app/lib/fonts';

export default function Footer() {
  return (
    <div
      id="footer"
      className="texture-overlay flex min-h-screen snap-start snap-always flex-col items-center justify-center space-y-12 px-12 pb-12 pt-24 md:px-32 lg:px-44"
    >
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
        <a
          href="https://github.com/macamp0328/sxsw-zine"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-center text-lg text-sub-text underline ${robotoCondensed.className}`}
        >
          GitHub Repository
        </a>
      </div>
      <div className="squiggle-texture-overlay relative mx-4 my-3 w-full border-4 border-sub-text bg-sub-background p-3">
        <p className=" text-center text-base text-main-text">
          I am looking for a full-time position in either product management or
          developer advocate (DevRel) roles. I excel at being the glue and
          translator between users, technical teams, and cross-functional
          stakeholders, with a simple goal: to help builders build. I appreciate
          your time, but also your help.{' '}
          <a
            href="https://drive.google.com/file/d/1C4wY320KbWoiEtrAzZuYfyVY8yizbT2b/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center underline"
          >
            {' '}
            <strong>Feel free to send my resume to anyone!</strong>
          </a>
        </p>
      </div>
      <div className="flex-col items-center justify-center pb-4 sm:mt-8">
        <p
          className={`text-center text-lg text-sub-text  ${robotoCondensed.className}`}
        >
          Other places you can find me:{' '}
          <a
            href="https://www.instagram.com/twitterlessmiles/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-lg underline"
          >
            @twitterlessmiles
          </a>
          {', '}
          <a
            href="https://www.linkedin.com/in/milescamp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-lg underline"
          >
            linkedin
          </a>
          , or we could just hang out like humans.
        </p>
      </div>
    </div>
  );
}
