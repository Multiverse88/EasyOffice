import fs from "node:fs";
import path from "node:path";

const extraImages = [
  {
    name: "keuntungan-lokasi-prestisius.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/lokasi-prestisius.png",
  },
  {
    name: "keuntungan-transaksi-aman.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/transaksi-aman.png",
  },
  {
    name: "keuntungan-fasilitas-lengkap.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/fasilitas-lengkap.png",
  },
  {
    name: "keuntungan-harga-terjangkau.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/Harga-Terjangkau.png",
  },
  {
    name: "keuntungan-meeting-room.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/meeting-room.png",
  },
  {
    name: "keuntungan-layanan-surat.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2025/04/Layanan-surat-menyurat.png",
  },
  {
    name: "icon-signage.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/company_15499234-r6888dllbib0909t667e9bcc4mvfylc0v050ec25tw.png",
  },
  {
    name: "icon-projector.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/projector_6815367-r6888ejficcakm8g0om0tt3sq0qt6afr74shvm0rno.png",
  },
  {
    name: "icon-imb.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/dossier_10819350-r6888ejficcakm8g0om0tt3sq0qt6afr74shvm0rne.png",
  },
  {
    name: "icon-location.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/location_4034469-r6888ejficcakm8g0om0tt3sq0qt6afr74shvm0rno.png",
  },
  {
    name: "icon-wifi.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/wifi_10417507-r6888ejficcakm8g0om0tt3sq0qt6afr74shvm0rno.png",
  },
  {
    name: "icon-mail.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/open-email_7351763-r6888fh9p6dkw872v70neav9bem6dzjhj9fzcvzdhg.png",
  },
  {
    name: "icon-pkp.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/tax_7801222-r6888fh9p6dkw872v70neav9bem6dzjhj9fzcvzdhg.png",
  },
  {
    name: "icon-meeting.png",
    url: "https://easyoffice.co.id/wp-content/uploads/elementor/thumbs/meeting_17411457-r6888fh9p6dkw872v70neav9bem6dzjhj9fzcvzdhg.png",
  },
  {
    name: "bsi-logo.png",
    url: "https://easyoffice.co.id/wp-content/uploads/2026/04/BSI-1024x287.png",
  },
];

const destDir = path.resolve("public/images/easyoffice");

async function download() {
  for (const item of extraImages) {
    const destPath = path.join(destDir, item.name);
    try {
      console.log(`Downloading ${item.name}...`);
      const response = await fetch(item.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)",
        },
      });
      if (response.ok) {
        const buf = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(destPath, buf);
        console.log(`Saved ${item.name} (${buf.length} bytes)`);
      } else {
        console.error(`Failed ${item.name}: ${response.status}`);
      }
    } catch (e) {
      console.error(`Error ${item.name}: ${e.message}`);
    }
  }
}

await download();
