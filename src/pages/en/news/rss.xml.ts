import rss from "@astrojs/rss";
import { readDataFile } from "../../../components/docs/nav";
import { SITE } from "../../../i18n/config";

interface DiscussionItem {
  number: number;
  title: string;
  url: string;
  createdAt: string;
  author: string | null;
  comments: number;
  excerpt: string;
}
interface DiscussionsFile {
  category: string;
  categoryUrl: string;
  fetchedAt: string | null;
  items: DiscussionItem[];
}

/**
 * RSS feed of the Announcements category — the syndication bridge for
 * future social automation (docs/SOCIAL.md §4) and classic readers.
 * Items stay in their original language and deep-link to GitHub.
 */
export const GET = async () => {
  const feed = readDataFile<DiscussionsFile>("discussions.json");
  const items = feed?.items ?? [];

  return rss({
    title: "keel — announcements",
    description:
      "Announcements from the keel project: releases, compliance write-ups, research notes, and honest results. Read and reply on GitHub Discussions.",
    site: SITE,
    trailingSlash: true,
    items: items.map((item) => ({
      title: item.title,
      pubDate: new Date(item.createdAt),
      description: item.excerpt,
      link: item.url,
      author: item.author ? `${item.author}@users.noreply.github.com (${item.author})` : undefined,
    })),
    customData: "<language>en</language>",
  });
};
