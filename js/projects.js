/* ==========================================================================
   I&CA — site content
   --------------------------------------------------------------------------
   Everything the site *says* lives in this file: the projects, the services
   and the steps of a project. js/main.js reads these lists and builds every
   page from them, so the words and pictures can change without touching the
   layout or the code.

   To add a client:
     1. Put their images in assets/images/<slug>/ (e.g. assets/images/acme/).
     2. Copy one of the entries in PROJECTS below, change the text and the
        image file names, and save. The Work page, the home carousel and the
        new project page all appear automatically.
   ========================================================================== */


/* --------------------------------------------------------------------------
   Images
   --------------------------------------------------------------------------
   image(file, width, adobe)
     file   the picture inside assets/images/, e.g. "boris/01.jpg"
     width  its width in pixels. Pictures 1200px wide or less are shown at
            half width in a project's gallery.
     adobe  where the same picture lives on I&CA's old Adobe Portfolio. Only
            used as a backup: if the local file is missing, the site loads
            this copy instead, so visitors never see a broken image.
            scripts/get-images.sh also reads these to download the files.
            For a picture that isn't on Adobe Portfolio, use "" here.

   Keep each image(...) on one line: the download script looks for them that way.
   -------------------------------------------------------------------------- */
const ADOBE_PORTFOLIO = "https://cdn.myportfolio.com/e3de7dd9-4ecf-4bc4-9b60-4e027ea0bb97/";

function image(file, width, adobe) {
  return {
    src: "assets/images/" + file,
    fallback: adobe ? ADOBE_PORTFOLIO + adobe : "", // "" = no backup copy
    width: width,
  };
}

/* The animated showreel of I&CA's work, opening on the I&CA wordmark (About page) */
const HERO = image("studio/hero.gif", 3840, "05802ab3-43ad-4ce5-8d1b-3721f42a68ec_rw_3840.gif?h=b9168cd53a4a7091f825a2be7d2b26db");


/* --------------------------------------------------------------------------
   Projects
   --------------------------------------------------------------------------
   slug          short name used in the address (#boris) and the image folder
   tags          which Work page filters show it: "identity", "digital", "print"
   palette       swatch colours shown on the project page
   cover         [main picture, picture shown on hover (desktop only)]
   images        the gallery, in order
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    slug: "boris",
    name: "Boris Bakery",
    sector: "Bakery",
    scope: "Logo · Identity · Photo direction",
    type: "Custom stencil mark",
    tags: ["identity"],
    palette: ["#111111", "#ffffff", "#ef6a1e"],
    paletteNames: "Black, white, orange",
    intro: "A neighbourhood bakery built around Irena Boris and one simple promise: exceptional bread at a fair price, so good it sells out every day.",
    body: [
      "Irena is the Canadian-born daughter of Russian immigrants, and the brand had to carry both her standards and her warmth. The mark is drawn with a subtractive, semi-stencil cut. It is hard-edged, but it stays simple.",
      "Black and white carry the identity. Orange is used sparingly, as a single bright accent. Photography stays close to the bread: warm, daily and hand-made.",
    ],
    cover: [
      image("boris/cover.jpg", 1920, "54ab03bc-d521-407e-9272-95c60bb39d79_rw_1920.jpg?h=942fa8799928b9f2dd8049b5a3f429c5"),
      image("boris/cover-hover.jpg", 1920, "6ab97552-c211-479e-a786-d95a393608f0_rw_1920.jpg?h=cd6eb8e274e01ab3657767f4dd8c7f0d"),
    ],
    images: [
      image("boris/01.jpg", 1920, "1e951e30-00d9-41fd-be5b-6c430b869bc6_rw_1920.jpg?h=045447562a0d7c7da297ea8d174ff45b"),
      image("boris/02.jpg", 1920, "f9482549-101f-4b59-8404-5663454c081d_rw_1920.jpg?h=01e55ea753d03ea0479ba8b2cd887c1e"),
      image("boris/03.jpg", 1920, "9466bbbc-fd1b-4afb-b389-d4a0d7366312_rw_1920.jpg?h=0c30e46b6bbc08fdba82cdec8929c515"),
      image("boris/04.jpg", 1200, "66d3e4cc-dd14-4eda-9fa0-8026f513be8f_rw_1200.jpg?h=d8bf521ed955b223c5f151071d678d18"),
      image("boris/05.jpg", 600, "6176e5d1-3773-4fc6-bb70-c883b422932b_rw_600.jpg?h=c91906d9ef7cf8936e72290da1d28bbb"),
      image("boris/06.jpg", 1920, "5e442787-657d-4e4d-98e6-829d670cc417_rw_1920.jpg?h=6036d1101e2c615957dfde58fea7f96b"),
      image("boris/07.png", 1920, "19d86c35-a5b5-460f-97e2-eb46774756b0_rw_1920.png?h=3ccb3a2cc4056f209d431172da70f7fb"),
      image("boris/08.jpg", 600, "3ee765d8-ea8c-498b-9bfb-fd2c686f9e69_rw_600.jpg?h=15a4651f2d6b602af559db5ef28d2807"),
      image("boris/09.jpg", 600, "5b4a5e4f-65d2-42b1-8861-f4b5e63d282f_rw_600.jpg?h=a8cdb3aceef2c0ccd878b2ae7b7de71f"),
    ],
  },
  {
    slug: "greenleaf",
    name: "Greenleaf",
    sector: "Renewable energy",
    scope: "Wordmark · Symbol · Digital",
    type: "All-caps geometric sans",
    tags: ["identity", "digital"],
    palette: ["#1b2a22", "#ffffff", "#8fae96"],
    paletteNames: "Deep green, white, sage",
    intro: "An energy company working across solar, wind, hydro, geothermal and bioenergy, built to replace the old utility model with something cleaner and quieter.",
    body: [
      "The wordmark is all caps with an even stroke and generous letter-spacing. It reads as calm, precise and premium, and it holds up in print and on screen.",
      "The teardrop symbol stands for water, the thread that runs from run-of-river hydro to geothermal cycles. Wide landscape photography shows the scale of the work while keeping its footprint feeling light.",
    ],
    cover: [
      image("greenleaf/cover.jpg", 1920, "6a5d6d81-c731-4361-bb92-39dd5e7f372d_rw_1920.jpg?h=baca9e68666574388a9f0128ec557287"),
      image("greenleaf/cover-hover.gif", 1200, "bc05b46e-1804-4d25-87b9-3ada6d2e39f6_rw_1200.gif?h=e7b90830a4fc3d65b5ced24061e054f6"),
    ],
    images: [
      image("greenleaf/01.jpg", 1920, "d6efef44-7f05-453b-98a2-7e7055f098b6_rw_1920.jpg?h=155653d67a1031b82d944f2c06cb576e"),
      image("greenleaf/02.jpg", 1920, "02273a88-d952-4368-a5df-452abb651724_rw_1920.jpg?h=a00bb15027a96717277b1501835961d8"),
      image("greenleaf/03.jpg", 1920, "17434f9d-5b38-4648-92ce-8fbe645c6c95_rw_1920.jpg?h=25663cd883fb865195f9fa4e54e0af50"),
      image("greenleaf/04.jpg", 1920, "1dd10e9e-368a-4ec2-b309-a36588d6837f_rw_1920.jpg?h=9483bca9c63afab970cd50ae42f7b943"),
      image("greenleaf/05.jpg", 1920, "d78b0a8b-41d4-4b23-9779-dfee4280d891_rw_1920.jpg?h=0161417e51465fae5789c893685f8ddf"),
    ],
  },
  {
    slug: "strata",
    name: "Strata",
    sector: "Property technology",
    scope: "Identity · Product design",
    type: "Belleza, Inter",
    tags: ["identity", "digital"],
    palette: ["#c8102e", "#111111", "#ffffff", "#3a3d42"],
    paletteNames: "Strata Red, black, white, graphite glass",
    intro: "A strata management platform for the condo buildings and strata corporations of British Columbia. Owners and council get one place for everything the building runs on.",
    body: [
      "The name comes from geology: layers laid down over time. The symbol is an S cut into three pieces. Two quarter-rounds form the ground, and the slab between them is the stratum. Both arcs share one radius, so the mark works as a sign, an app icon or a one-colour print.",
      "The app covers strata fees, the contingency reserve fund, maintenance requests, AGM voting, bylaws, documents and amenity bookings. It was designed at desktop scale first, then carried through to tablet and phone.",
    ],
    cover: [
      image("strata/cover.jpg", 1920, "d34d256a-8afb-416f-8a6c-9a9d23e58cb0_rw_1920.jpg?h=02172e2726eaaeae05d5c025e7c8fe34"),
      image("strata/cover-hover.gif", 1200, "4f6cce4e-3cd0-4b88-94e1-38da8fb3e9cc_rw_1200.gif?h=a90406a62c9c9ad9e49cbbb3fd975ac0"),
    ],
    images: [
      image("strata/01.jpg", 1920, "c7244871-dbe7-4df7-841d-6677c190c53b_rw_1920.jpg?h=bc4454285a43adac7e22097c32e588e8"),
      image("strata/02.jpg", 1920, "36e362b3-cfc9-48b5-a7e2-a8f742390a2f_rw_1920.jpg?h=fe869343b92bc376c76bb60c9a0aa507"),
      image("strata/03.jpg", 1920, "e9df35a0-793d-4c9d-ae4f-f95037bebe83_rw_1920.jpg?h=69fbaef8accc54a1789da26397ea111d"),
      image("strata/04.jpg", 1920, "966cae0e-adca-48a9-80a6-628ec9bb3cfc_rw_1920.jpg?h=5c461ec5f3fd6cc60bc866e077a854cb"),
      image("strata/05.jpg", 1920, "4c652345-e5dc-4427-94d3-26a3d216feb5_rw_1920.jpg?h=185de8f6d771e05e577a8cc680b7422c"),
      image("strata/06.jpg", 1920, "57f677ad-34dd-41b4-8007-1993344e6c29_rw_1920.jpg?h=f01388768b81a3c4774da7ee2f71e9bd"),
      image("strata/07.jpg", 1920, "ff30355d-7c43-47af-8f6a-1e1ae6300f73_rw_1920.jpg?h=0e691fcc90c116b21bb22eb594ce96e9"),
      image("strata/08.jpg", 1920, "792a7b91-7e2f-4f53-a8af-0a08ec04e4d5_rw_1920.jpg?h=d3514615989e1b8594a0abd1e101d4b6"),
      image("strata/09.jpg", 1920, "950aa7b9-5f93-4ec1-b1e4-b375aec0d40f_rw_1920.jpg?h=57f35e4c64e2acdfc4ca741b121aa297"),
      image("strata/10.jpg", 1920, "484c98e4-8ec5-4cf0-9eda-05172a0fef5d_rw_1920.jpg?h=db751f6ff8138e347a1e35f92c232c48"),
      image("strata/11.jpg", 1920, "ffd8056c-1590-41b0-b897-404d49a14608_rw_1920.jpg?h=142823bff54b87d04e1cd78738af7dba"),
    ],
  },
  {
    slug: "modius",
    name: "Modius",
    sector: "Car-share co-op",
    scope: "Symbol · Wordmark · Digital",
    type: "Avenir",
    tags: ["identity", "digital"],
    palette: ["#1f4e79", "#7fa7c9", "#ffffff"],
    paletteNames: "Calm blues, white",
    intro: "A member-owned car share co-operative. Members pay a modest fee and book shared cars across the community for errands, commutes and trips.",
    body: [
      "Unlike commercial car-share companies, the co-op is not-for-profit and governed by its members. The identity needed to feel trustworthy and calm rather than flashy.",
      "A simple geometric symbol and an Avenir wordmark sit on a cool blue palette built for print and screen. The digital work sets the groundwork for the website, print and signage to follow.",
    ],
    cover: [
      image("modius/cover.jpg", 1920, "a7579ded-db5b-4bbd-b96e-1cf6b6df7bb1_rw_1920.jpg?h=b15cdd63aefb29727ca89f77da5411e8"),
      image("modius/cover-hover.jpg", 1920, "81c6da3d-aff6-4e7b-af73-884052946c7d_rw_1920.jpg?h=41bf52d9b41530ed52cd73a02f852562"),
    ],
    images: [
      image("modius/01.jpg", 1920, "1af116b7-8ce9-4fd0-9609-7c0cadf6c850_rw_1920.jpg?h=8153eb4cd08a647bd69270b1492c4586"),
      image("modius/02.jpg", 1920, "de80a6a3-e0f8-4656-9c37-6467aa6dce49_rw_1920.jpg?h=499151f10fb4b1d34703c9faa4f8968e"),
      image("modius/03.jpg", 1920, "2bd9dd40-2606-48d2-9f48-68b7d3227ad7_rw_1920.jpg?h=7db1481200fa05b34ce8543476df7fae"),
      image("modius/04.jpg", 1920, "375191ce-520b-40d0-9738-a48bebe4d9c5_rw_1920.jpg?h=b78419fda67c6b02365fe5f0d0d37353"),
    ],
  },
  {
    slug: "mode",
    name: "Mode",
    sector: "Furniture",
    scope: "Identity · Website",
    type: "Cubic custom wordmark",
    tags: ["identity", "digital"],
    palette: ["#a8998a", "#6b7178", "#d8ccb8"],
    paletteNames: "Warm taupe, soft slate, muted sand",
    intro: "A modern furniture brand built on clean lines, clear structure and pieces meant to last.",
    body: [
      "The wordmark is a cube split cleanly into four quadrants: modularity, balance and good use of space in a single shape. A flexible two-colour system in taupe, slate and sand sits easily in almost any interior.",
      "The website follows the furniture. Geometric graphics, structured framing and a strong grid keep the experience as quiet and precise as the products.",
    ],
    cover: [
      image("mode/cover.jpg", 1920, "06d3d90a-61f2-4b66-bb4b-052185a9ad0e_rw_1920.jpg?h=0ffe0d84ccba4b2d6f77cc1ce1ae9c96"),
      image("mode/cover-hover.jpg", 1920, "6a5a1cce-9136-447a-ae78-911709db7c43_rw_1920.jpg?h=ddd0b153b85220188fc92dca54943019"),
    ],
    images: [
      image("mode/01.jpg", 1920, "c826f1c5-54c8-4e23-a0cc-4660d2308a61_rw_1920.jpg?h=72dd04b955646a52199898ad926acc30"),
      image("mode/02.jpg", 1920, "b6926010-4242-4477-9506-db6bb32bc608_rw_1920.jpg?h=cd1c86c8a441f684e69ad2205d933e6a"),
      image("mode/03.jpg", 1920, "fd673e23-7e38-4cf5-9abc-f607064d0c7f_rw_1920.jpg?h=505e4ea666ec4f4cc7ad30357dac8ce1"),
      image("mode/04.jpg", 1920, "7dffb392-3fc6-4386-a0ab-a933468c4099_rw_1920.jpg?h=36302e285f1ef5fd1f9313efda83b965"),
      image("mode/05.jpg", 1920, "51bf3e72-6e07-4fb4-a170-796719e9a4cf_rw_1920.jpg?h=72dd66c0bdba3e8e753e03878ee5b496"),
    ],
  },
  {
    slug: "brock",
    name: "Brock",
    sector: "Menswear",
    scope: "Lookbook · Print · Digital",
    type: "Architectural sans",
    tags: ["print", "digital"],
    palette: ["#111111", "#ffffff", "#8c8a85"],
    paletteNames: "Black, white, stone",
    intro: "Urban menswear at the meeting point of architecture and street culture: precise tailoring, premium textiles and understated luxury.",
    body: [
      "This work carries Brock's identity into print and digital lookbooks. The brief was to sit between everyday comfort and modern style.",
      "In a crowded media landscape, the layouts rely on clean structure, deliberate negative space and a refined presence. The clothes get room to speak.",
    ],
    cover: [
      image("brock/cover.jpg", 1920, "94045c30-6263-44c5-9397-5a5303aa3926_rw_1920.jpg?h=83e181eb9d823a5a31d5341626a401e9"),
      image("brock/cover-hover.jpg", 1920, "e4b524b7-adbd-4243-b7d4-2b10daba6503_rw_1920.jpg?h=03f059357892a638b0eca9db5814a339"),
    ],
    images: [
      image("brock/01.jpg", 1920, "c755aed5-6057-4743-8812-697b71d638dc_rw_1920.jpg?h=2acb417e2a987626345c7599a6849a02"),
      image("brock/02.jpg", 1920, "19421b59-b124-4fe0-82ac-f6dc0dce35d7_rw_1920.jpg?h=ce9bdaffb9c023978fd46c3069e5774a"),
      image("brock/03.jpg", 1920, "95a1d8d6-90e6-4496-b3c5-3c2c0817d29e_rw_1920.jpg?h=d8101e2f4348460a2d1961f9ba354451"),
      image("brock/04.jpg", 1920, "8763ec54-c432-4ce7-9f3d-040b51fd3f67_rw_1920.jpg?h=4eb066a1dc04d57a77112e9432a6e1fa"),
      image("brock/05.jpg", 1920, "3d06ad52-fac2-428c-a751-cc593556effc_rw_1920.jpg?h=2ee459f6e9a45a4256a56dcc3d228656"),
      image("brock/06.jpg", 1920, "8372e561-bd91-4692-a70c-b2b800bd8b63_rw_1920.jpg?h=128ac0bc906a98221fac6f432c6355bf"),
      image("brock/07.jpg", 1920, "7532f1ee-76b2-4099-9ea0-4b7fa8cc933e_rw_1920.jpg?h=eb4abae4f1451945751f278030ab8d73"),
    ],
  },
];


/* --------------------------------------------------------------------------
   Services (home and About pages)
   -------------------------------------------------------------------------- */
const SERVICES = [
  ["Identity", "Logos, wordmarks and symbols drawn for your business, with the colour and type to go with them."],
  ["Brand systems", "Guidelines, stationery, menus, packaging and collateral, so every touchpoint looks like it belongs."],
  ["Digital", "Websites, social templates and app interfaces that carry the identity onto the screen."],
  ["Signage & print", "Storefronts, wayfinding and printed pieces, prepared properly for your printer or fabricator."],
];


/* --------------------------------------------------------------------------
   How a project runs (home page; the first three also appear on Contact)
   -------------------------------------------------------------------------- */
const PROCESS = [
  ["Inquiry", "Tell us about your business and what you want to make."],
  ["Conversation", "A short call about your goals, timeline and budget."],
  ["Free proposal", "A clear scope and a fixed quote. No cost, no obligation."],
  ["Design & delivery", "We design, refine with you, and hand over every file you need."],
];
