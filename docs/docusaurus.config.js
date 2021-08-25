module.exports = {
  title: "AstraX Documentation",
  url: "https://docs.astrax-api-docs.netlify.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "./images/logo.png",
  organizationName: "@bajetech",
  projectName: "astraxDocs",
  themeConfig: {
    navbar: {
      title: "AstraX Documentation",
      logo: {
        alt: "AstraX Logo",
        src: "./images/logo.png",
      },
      items: [
        {
          href: "https://github.com/bajetech/AstraX/tree/main/docs",
          label: "GitHub",
          position: "left",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Questions or comments?",
          items: [
            {
              label: "Let us know!",
              to: "https://stellarform.typeform.com/to/r4FiNpX1",
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/stellar/lyra/tree/master/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
