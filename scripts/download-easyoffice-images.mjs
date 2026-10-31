import fs from "node:fs";
import path from "node:path";

const images = [
  {
    name: "office-hero.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/11/pto4-scaled.jpg",
  },
  {
    name: "office-bandung.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2024/10/4.png",
  },
  {
    name: "office-meeting.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2024/10/1-1.png",
  },
  {
    name: "office-lounge.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2024/10/2.png",
  },
  {
    name: "office-workspace.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2024/10/3.png",
  },
  {
    name: "promo-banner.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/Promo-easyoffice2.png",
  },
  {
    name: "promo-card-1.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/photo_2025-04-22_22-32-09.jpg",
  },
  {
    name: "promo-card-2.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/photo_2025-04-22_22-33-10.jpg",
  },
  {
    name: "promo-card-3.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/photo_2025-04-22_22-33-42.jpg",
  },
  {
    name: "benefit-hemat-biaya.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/Hemat-biaya-qshhd4c308tzu2q53l21xsvlzrxw1ahp6gf89qid2w.jpg",
  },
  {
    name: "benefit-fleksibilitas.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/virtual-Office-dewataoffice-r4mc449wetans1dru5lvi1hxpol46xclp4d3ovasxs.jpg",
  },
  {
    name: "benefit-citra-perusahaan.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/Menaikan-Citra-Perusahaan-dewataoffice-r4mc69cnz886829tc2xa6i1qfa17q3ulbpux1k4irk.jpg",
  },
  {
    name: "benefit-layanan-pendukung.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/Layanan-Pendukung-Bisnis-r4mc8effjn5oo35uu08ouylj4vhb9ackybcqe8y8lc.jpg",
  },
  {
    name: "benefit-meeting-room.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/fasilitas-meeting-room-r4mcaldvhq5rrbz60ydcoeo918o57v21965iphp62o.jpg",
  },
  {
    name: "benefit-bisa-pkp.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/bisa-untuk-PKP-r4mcbnx99xmizcf6rx120my5e1e6zgb12gwfdu40zk.jpg",
  },
  {
    name: "legalitas-ahu.jpg",
    url: "https://easyoffice.co.id/wp-content/uploads/2026/04/EKB.jpg",
  },
];

const destDir = path.resolve("public/images/easyoffice");
fs.mkdirSync(destDir, { recursive: true });

async function downloadAll() {
  for (const item of images) {
    const destPath = path.join(destDir, item.name);
    try {
      console.log(`Downloading ${item.name} from ${item.url}...`);
      const response = await fetch(item.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
      if (!response.ok) {
        console.error(`Failed ${item.name}: ${response.status}`);
        continue;
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      console.log(`Saved ${item.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error ${item.name}:`, err.message);
    }
  }
}

await downloadAll();
