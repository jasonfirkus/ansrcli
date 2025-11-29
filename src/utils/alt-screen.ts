import cliCursor from "cli-cursor";

function enterAltScreen() {
  // Alternate buffer + clear & home
  process.stdout.write("\x1b[?1049h\x1b[2J\x1b[H");

  // Hide cursor
  // process.stdout.write("\x1b[?25l");
  cliCursor.hide();
}

function leaveAltScreen() {
  // Show cursor again
  // process.stdout.write("\x1b[?25h");
  cliCursor.show();

  // Back to normal buffer
  process.stdout.write("\x1b[?1049l");
}

export { enterAltScreen, leaveAltScreen };
