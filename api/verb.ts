export interface VerbData {
  verb: string; // Động từ (kanji)
  reading: string; // Cách đọc (hiragana)
  meaning: string; // Nghĩa (tiếng Việt)
  group: string;
}

const SHEET_URLS = {
  group1:
    "https://docs.google.com/spreadsheets/d/1kMg_CoSBHj38O6o5RqPunXfeREz_fHPRtyWVXW0ilcI/export?format=csv",
  group2:
    "https://docs.google.com/spreadsheets/d/1uuhKkVMbwjtMSYpcjgrflFGhpEd9596KZ19ZS5N3EzA/export?format=csv",
  group3:
    "https://docs.google.com/spreadsheets/d/1cat7bx6zuontX2XJM71ubbc_GMVgaUvXhmQfMVt6oSA/export?format=csv",
};

function parseCSV(csv: string): string[][] {
  const rows = csv.split("\n");
  return rows.map((row) => {
    const values: string[] = [];
    let currentValue = "";
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = "";
      } else {
        currentValue += char;
      }
    }

    values.push(currentValue.trim());
    return values;
  });
}

export async function fetchVerbData(
  group: "group1" | "group2" | "group3",
): Promise<VerbData[]> {
  try {
    const url = SHEET_URLS[group];
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    // Skip header row (index 0)
    return rows
      .slice(1)
      .map((row) => ({
        verb: row[0] || "",
        reading: row[1] || "",
        meaning: row[2] || "",
        group:
          group === "group1"
            ? "group1"
            : group === "group2"
              ? "group2"
              : "group3",
      }))
      .filter((item) => item.verb && item.reading); // Filter out empty rows
  } catch (error) {
    console.error(`Error fetching ${group} data:`, error);
    return [];
  }
}

export async function fetchAllVerbs(): Promise<{
  group1: VerbData[];
  group2: VerbData[];
  group3: VerbData[];
}> {
  const [group1, group2, group3] = await Promise.all([
    fetchVerbData("group1"),
    fetchVerbData("group2"),
    fetchVerbData("group3"),
  ]);

  return { group1, group2, group3 };
}
