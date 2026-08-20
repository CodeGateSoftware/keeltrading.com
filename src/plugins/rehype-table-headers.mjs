/**
 * Rehype plugin for rendered engine documents: markdown tables with an empty
 * corner header (e.g. the runbook's profile matrix) leave their first column
 * as <td> cells with no associated header — an axe td-has-header failure.
 * When the corner <th> is empty, promote first-column body cells to
 * <th scope="row"> and stamp all header cells with scope="col".
 * Content is never edited — this is a rendering transform on fetched markdown.
 */
function textOf(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

export function rehypeTableHeaders() {
  const visit = (node) => {
    if (node.type === "element" && node.tagName === "table") {
      const rows = (parent) =>
        (parent?.children ?? []).filter(
          (child) => child.type === "element" && child.tagName === "tr",
        );
      const cells = (row) =>
        (row?.children ?? []).filter(
          (child) =>
            child.type === "element" && (child.tagName === "th" || child.tagName === "td"),
        );
      const section = (name) =>
        node.children.find(
          (child) => child.type === "element" && child.tagName === name,
        );

      const headRow = rows(section("thead"))[0];
      const headCells = cells(headRow);
      const cornerEmpty =
        headCells.length > 0 &&
        headCells[0].tagName === "th" &&
        textOf(headCells[0]).trim() === "";

      for (const cell of headCells) {
        if (cell.tagName === "th") {
          cell.properties = { ...(cell.properties ?? {}), scope: "col" };
        }
      }
      if (cornerEmpty) {
        for (const row of rows(section("tbody"))) {
          const first = cells(row)[0];
          if (first && first.tagName === "td") {
            first.tagName = "th";
            first.properties = { ...(first.properties ?? {}), scope: "row" };
          }
        }
      }
    }
    for (const child of node.children ?? []) visit(child);
  };
  return (tree) => {
    visit(tree);
  };
}
