# carbonless gallery

Case studies for [carbonless](https://github.com/Gilthans/carbonless): one pull request per case, regular or edge, to open in carbonless and see how it's handled.

Each case has its own base branch (`base/<case>`) and head branch (`case/<case>`), so the cases don't affect each other. The PR description says what to look at.

| Case | PR | What it shows |
|---|---|---|
| whitespace | #1 | Re-indents, CRLF, trailing spaces and a moved block next to real changes (Settings → Ignore whitespace). |
| regular | #2 | An ordinary feature PR with tests: the control case. |
| renames | #3 | Pure, edited, moved and copied files, and renames either side of git's 50% similarity threshold. |
| file-kinds | #4 | Binary and image files, empty files, a symlink, a mode change, a deleted file and a submodule bump. |
| moved-code | #5 | A function moved within a file, one moved to another file, and one moved and edited. |
| invisibles | #6 | Zero-width and no-break spaces, tabs vs spaces, a BOM, a missing final newline, RTL text, emoji and a 401-character line. |
| big | #7 | 60 files, a regenerated lockfile, a minified vendored file and generated code: first-open performance. |
| history-merge | #8 | The base moves on and is merged into the PR branch (with a conflict), then a later commit. |
| history-force-push | #9 | A first version, a review on it, then a rebase onto a moved base with edits and a force-push. |
| threads | #10 | Single-line, multi-line, deleted-line and file-level review threads, replies with Markdown, one resolved, one outdated. |
| merged-left | #11 | A review started in carbonless, then the PR merged by a merge commit: GitHub still puts LEFT lines on the PR's own diff, while the base branch now holds the head. |
| side-by-side | #12 | Clusters of 2/5, 5/2 and 1/5, a 400-character line, tabs, a lost final newline (one 1/1, one in a 1/3), whitespace-only and mixed clusters, a context line with threads on both sides, a 2,000-line single hunk (Settings → Side by side). |
