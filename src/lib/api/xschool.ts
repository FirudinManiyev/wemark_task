export interface XSchoolImage {
  image: string;
}

export interface XSchoolFounder {
  title: string;
  description: string;
  name: string;
  position: string;
  image: string;
  linkedin_url: string;
  instagram_url: string;
}

export interface XSchoolProgram {
  title: string;
  description: string;
}

export interface XSchoolFaq {
  question: string;
  answer: string;
}

export interface XSchoolTextSlider {
  xline1: string;
  xline2: string;
  xline3: string;
}

export interface XSchoolData {
  banner_title: string;
  banner_image: string;
  about_title: string;
  about_description: string;
  about_images: XSchoolImage[];
  founders: XSchoolFounder[];
  programs: XSchoolProgram[];
  faq_title: string;
  xschool_faq: XSchoolFaq[];
  text_slider: XSchoolTextSlider;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStrings(value: unknown, keys: readonly string[]): value is Record<string, string> {
  return isRecord(value) && keys.every((key) => typeof value[key] === "string");
}

function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

function isXSchoolData(value: unknown): value is XSchoolData {
  if (!isRecord(value)) return false;

  return (
    hasStrings(value, [
      "banner_title",
      "banner_image",
      "about_title",
      "about_description",
      "faq_title",
    ]) &&
    isArrayOf(value.about_images, (item): item is XSchoolImage => hasStrings(item, ["image"])) &&
    isArrayOf(value.founders, (item): item is XSchoolFounder =>
      hasStrings(item, [
        "title",
        "description",
        "name",
        "position",
        "image",
        "linkedin_url",
        "instagram_url",
      ]),
    ) &&
    isArrayOf(value.programs, (item): item is XSchoolProgram =>
      hasStrings(item, ["title", "description"]),
    ) &&
    isArrayOf(value.xschool_faq, (item): item is XSchoolFaq =>
      hasStrings(item, ["question", "answer"]),
    ) &&
    hasStrings(value.text_slider, ["xline1", "xline2", "xline3"])
  );
}

export async function getXSchoolData(): Promise<XSchoolData> {
  const url = process.env.XSCHOOL_API_URL;
  if (!url) throw new Error("XSCHOOL_API_URL is not configured");

  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`xSchool API returned ${response.status}`);

  const data: unknown = await response.json();
  if (!isXSchoolData(data)) throw new Error("xSchool API returned an unexpected response");

  return data;
}
