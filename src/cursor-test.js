// cursor-test.mjs
setTimeout(() => {
  process.stdout.write("Hiding cursor for 3 seconds...\n");
  process.stdout.write("\x1B[?25l");

  setTimeout(() => {
    process.stdout.write("\nShowing cursor again.\n");
    process.stdout.write("\x1B[?25h");
    process.exit(0);
  }, 3000);
}, 200);
