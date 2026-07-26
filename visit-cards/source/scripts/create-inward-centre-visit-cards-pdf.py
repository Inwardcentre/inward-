"""Create the print-ready Inward Centre visit-card PDF from the 300 DPI art."""

from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT / "outputs" / "marketing" / "inward-centre-visit-cards"
OUTPUT_PDF = OUTPUT_DIR / "inward-centre-visit-cards-print.pdf"
CARD_SIDES = (
    OUTPUT_DIR / "inward-centre-visit-card-front-with-bleed-300dpi.png",
    OUTPUT_DIR / "inward-centre-visit-card-back-with-bleed-300dpi.png",
)

# Business-card trim: 3.5 x 2 in. The source art includes 0.125 in bleed on all
# sides, so the physical PDF page is 3.75 x 2.25 in.
POINTS_PER_INCH = 72
PAGE_WIDTH = 3.75 * POINTS_PER_INCH
PAGE_HEIGHT = 2.25 * POINTS_PER_INCH
BLEED = 0.125 * POINTS_PER_INCH
TRIM_BOX = RectangleObject([BLEED, BLEED, PAGE_WIDTH - BLEED, PAGE_HEIGHT - BLEED])
BLEED_BOX = RectangleObject([0, 0, PAGE_WIDTH, PAGE_HEIGHT])


def main() -> None:
    missing = [str(side) for side in CARD_SIDES if not side.exists()]
    if missing:
        raise FileNotFoundError("Generate the card PNGs first: " + ", ".join(missing))

    temporary_pdf = OUTPUT_DIR / "_inward-centre-visit-cards-unboxed.pdf"
    output = canvas.Canvas(str(temporary_pdf), pagesize=(PAGE_WIDTH, PAGE_HEIGHT))
    output.setTitle("Inward Centre - Mental Health Check-Up Clinic visit cards")
    output.setAuthor("Inward Centre Inc.")
    output.setSubject("Two-sided 3.5 x 2 in visit card with 0.125 in bleed")
    for side in CARD_SIDES:
        output.drawImage(ImageReader(str(side)), 0, 0, width=PAGE_WIDTH, height=PAGE_HEIGHT, mask="auto")
        output.showPage()
    output.save()

    reader = PdfReader(str(temporary_pdf))
    writer = PdfWriter()
    for page in reader.pages:
        page.trimbox = TRIM_BOX
        page.bleedbox = BLEED_BOX
        page.artbox = TRIM_BOX
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "Inward Centre - Mental Health Check-Up Clinic visit cards",
        "/Author": "Inward Centre Inc.",
        "/Subject": "Two-sided 3.5 x 2 in visit card with 0.125 in bleed",
    })
    with OUTPUT_PDF.open("wb") as stream:
        writer.write(stream)
    temporary_pdf.unlink()
    print(OUTPUT_PDF)


if __name__ == "__main__":
    main()
