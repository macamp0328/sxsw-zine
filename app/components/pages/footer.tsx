export default function Footer() {
  return (
    <div
      id="footer"
      className="texture-overlay flex min-h-screen snap-start snap-always flex-col items-center justify-center md:px-32"
    >
      <p className="text-center text-main-text">
        You&apos;ve reached the end of the almost 50 sets.
      </p>
      <p className="text-center text-sub-text">
        If you made it this far, you should probably go back and listen to some
        music.
      </p>
      <p className="mt-4 text-center text-sub-text">
        If you would like to see the source code for this project, you can find
        it on GitHub. I am treating this as a sandbox, so it will continue to
        evolve.
      </p>
      <a
        href="https://github.com/macamp0328/sxsw-zine"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-sub-text underline"
      >
        GitHub Repository
      </a>
    </div>
  );
}
