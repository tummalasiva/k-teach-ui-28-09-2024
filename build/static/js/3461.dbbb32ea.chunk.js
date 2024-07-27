/** @format */

"use strict";
(self.webpackChunkschoolerp = self.webpackChunkschoolerp || []).push([
  [3461],
  {
    22011: (e, t, n) => {
      n.d(t, { A: () => d });
      var i = n(65043),
        l = n(96446),
        s = n(68903),
        o = n(73213),
        a = n(47533),
        r = n(81728),
        c = n(70579);
      function d(e) {
        let { onThemeSelect: t = () => {}, webTheme: n } = e;
        const { selectedSetting: d } = i.useContext(r.A),
          { setSelectedTheme: x } = i.useContext(a.A),
          [h, m] = i.useState(
            (null === d || void 0 === d ? void 0 : d.selectedTheme) || 1
          ),
          [p, j] = i.useState(1);
        return (0, c.jsx)(i.Fragment, {
          children: (0, c.jsx)(l.A, {
            dividers: !0,
            children: (0, c.jsx)(s.Ay, {
              spacing: 2,
              container: !0,
              children: n
                ? o.A.websiteThemes.map((e) =>
                    (0, c.jsx)(
                      s.Ay,
                      {
                        item: !0,
                        sx: {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        children: (0, c.jsx)("div", {
                          onClick: () => {
                            return (n = e.theme), t(n), void m(n);
                            var n;
                          },
                          children: (0, c.jsx)("img", {
                            style: {
                              height: "150px",
                              width: "200px",
                              objectFit: "contain",
                              border:
                                parseInt(h) === e.theme
                                  ? "2px solid green"
                                  : "2px solid lightgray",
                              borderRadius: "5px",
                              overflow: "hidden",
                            },
                            src: e.image,
                            alt: "Theme ".concat(e.theme),
                          }),
                        }),
                      },
                      e.theme + e.image
                    )
                  )
                : o.A.idCardThemes.map((e) =>
                    (0, c.jsx)(
                      s.Ay,
                      {
                        item: !0,
                        sx: {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        children: (0, c.jsx)("div", {
                          onClick: () => {
                            return (n = e.theme), t(n), void j(n);
                            var n;
                          },
                          children: (0, c.jsx)("img", {
                            style: {
                              height: "150px",
                              width: "200px",
                              objectFit: "contain",
                              border:
                                parseInt(p) === e.theme
                                  ? "2px solid green"
                                  : "2px solid lightgray",
                              borderRadius: "5px",
                              overflow: "hidden",
                            },
                            src: e.image,
                            alt: "Theme ".concat(e.theme),
                          }),
                        }),
                      },
                      e.theme + e.image
                    )
                  ),
            }),
          }),
        });
      }
    },
    92036: (e, t, n) => {
      n.r(t), n.d(t, { default: () => I });
      var i = n(65043),
        l = n(73216),
        s = n(34325),
        o = n(24897),
        a = n(25343),
        r = n(70579);
      const c = i.lazy(() =>
          Promise.all([
            n.e(9528),
            n.e(6178),
            n.e(1903),
            n.e(8704),
            n.e(2375),
          ]).then(n.bind(n, 20157))
        ),
        d = i.lazy(() => n.e(8598).then(n.bind(n, 40495))),
        x = i.lazy(() => n.e(6960).then(n.bind(n, 4837))),
        h = i.lazy(() => n.e(9722).then(n.bind(n, 28963))),
        m = i.lazy(() => n.e(797).then(n.bind(n, 40193))),
        p = i.lazy(() => n.e(6574).then(n.bind(n, 23527))),
        j = i.lazy(() => n.e(6305).then(n.bind(n, 52748))),
        g = i.lazy(() => n.e(8592).then(n.bind(n, 79745))),
        y = i.lazy(() => n.e(7051).then(n.bind(n, 34670))),
        u = i.lazy(() => n.e(4859).then(n.bind(n, 23197))),
        A = i.lazy(() =>
          Promise.all([n.e(2661), n.e(7814)]).then(n.bind(n, 47814))
        ),
        b = i.lazy(() =>
          Promise.all([n.e(5622), n.e(9257), n.e(9713)]).then(n.bind(n, 53756))
        ),
        f = i.lazy(() =>
          Promise.all([n.e(5622), n.e(4741), n.e(2532)]).then(n.bind(n, 32532))
        ),
        k = i.lazy(() =>
          Promise.all([n.e(9528), n.e(25)]).then(n.bind(n, 8244))
        ),
        v = i.lazy(() =>
          Promise.all([n.e(6178), n.e(4593)]).then(n.bind(n, 87180))
        ),
        w = i.lazy(() => n.e(4401).then(n.bind(n, 59388))),
        C = i.lazy(() => n.e(6126).then(n.bind(n, 38663))),
        z = i.lazy(() => n.e(5412).then(n.bind(n, 90281))),
        S = i.lazy(() => n.e(5824).then(n.bind(n, 27573))),
        I = () => {
          const e = (0, l.zy)();
          return (
            (0, i.useEffect)(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, [e.pathname]),
            window.location.pathname.startsWith("/sch")
              ? null
              : (0, r.jsxs)(r.Fragment, {
                  children: [
                    (0, r.jsx)(s.A, {}),
                    (0, r.jsx)(o.A, {}),
                    (0, r.jsxs)(l.BV, {
                      children: [
                        (0, r.jsx)(l.qh, {
                          path: "/",
                          element: (0, r.jsx)(c, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/about/overview",
                          element: (0, r.jsx)(d, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/about/founder",
                          element: (0, r.jsx)(x, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/about/visionandmission",
                          element: (0, r.jsx)(h, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/facilities/library",
                          element: (0, r.jsx)(m, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/facilities/canteen",
                          element: (0, r.jsx)(g, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/facilities/dance-and-singing",
                          element: (0, r.jsx)(y, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/features/unique-features",
                          element: (0, r.jsx)(z, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/features/to-the-knowledge-of-parents",
                          element: (0, r.jsx)(S, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/facilities/transport",
                          element: (0, r.jsx)(u, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/home-gallery",
                          element: (0, r.jsx)(k, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/contact-us",
                          element: (0, r.jsx)(A, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/results",
                          element: (0, r.jsx)(b, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/assignment",
                          element: (0, r.jsx)(p, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/pre-admission",
                          element: (0, r.jsx)(f, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/eventDetails/:id",
                          element: (0, r.jsx)(v, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/award-details/:id",
                          element: (0, r.jsx)(j, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/news-and-notice-details/:id",
                          element: (0, r.jsx)(w, {}),
                        }),
                        (0, r.jsx)(l.qh, {
                          path: "/notice-details/:id",
                          element: (0, r.jsx)(C, {}),
                        }),
                      ],
                    }),
                    (0, r.jsx)(a.A, {}),
                    (0, r.jsx)(l.sv, {}),
                  ],
                })
          );
        };
    },
    25343: (e, t, n) => {
      n.d(t, { A: () => S });
      var i = n(65043);
      const l = n.p + "static/media/eCampusstreet.86f5265b187770963420.png";
      var s = n(34535),
        o = n(85865),
        a = n(96446),
        r = n(68903),
        c = n(35475),
        d = n(60348),
        x = n(53417),
        h = n(47734),
        m = n(73213),
        p = n(98703),
        j = n(3563),
        g = n(88010),
        y = n(81728),
        u = n(70579);
      const A = (0, s.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return { color: "white", fontFamily: "sans-serif", fontSize: "1rem" };
        }),
        b = (0, s.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return {
            color: "white",
            padding: "10px 0px",
            fontFamily: "sans-serif",
          };
        }),
        f = (0, s.Ay)(c.N_)({
          textDecoration: "none",
          color: "white",
          fontSize: "1rem",
          fontFamily: "sans-serif",
          cursor: "pointer",
          transition: "1s",
          "&:hover": { color: m.A.darkPalette.primary.main },
        }),
        k = (0, s.Ay)(o.A)(() => ({
          fontSize: "1.2rem",
          fontWeight: "bold",
          textAlign: "center",
          color: m.A.darkPalette.primary.main,
          fontFamily: "sans-serif",
          margin: "15px 0px",
        })),
        v = (0, s.Ay)(a.A)((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "1.2rem",
            textAlign: "start",
          };
        }),
        w = (0, s.Ay)(a.A)((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "30px",
          };
        }),
        C = (0, s.Ay)(a.A)((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          };
        }),
        z = (0, s.Ay)(a.A)((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          };
        }),
        S = () => {
          const { selectedSetting: e } = (0, i.useContext)(y.A);
          return (0, u.jsxs)(u.Fragment, {
            children: [
              (0, u.jsxs)(a.A, {
                sx: { backgroundColor: "black", padding: "20px 30px" },
                children: [
                  " ",
                  (0, u.jsxs)(r.Ay, {
                    container: !0,
                    spacing: 2,
                    children: [
                      (0, u.jsx)(r.Ay, {
                        item: !0,
                        xs: 12,
                        lg: 2,
                        md: 6,
                        sm: 6,
                        children: (0, u.jsx)(a.A, {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          children: (0, u.jsx)("img", {
                            src: l,
                            alt: "logo",
                            height: 180,
                            width: 180,
                            style: { objectFit: "contain", margin: "15px 0px" },
                          }),
                        }),
                      }),
                      (0, u.jsxs)(r.Ay, {
                        item: !0,
                        xs: 12,
                        lg: 3,
                        md: 6,
                        sm: 6,
                        children: [
                          (0, u.jsx)(k, {
                            textAlign: "center",
                            children: "USEFULL LINKS",
                          }),
                          (0, u.jsxs)(w, {
                            children: [
                              (0, u.jsxs)(v, {
                                children: [
                                  (0, u.jsx)(f, {
                                    to: "/",
                                    children: " Home ",
                                  }),
                                  (0, u.jsx)(f, {
                                    to: "/about/overview",
                                    children: " About ",
                                  }),
                                  (0, u.jsx)(f, {
                                    to: "/home-gallery",
                                    children: " Gallery ",
                                  }),
                                ],
                              }),
                              (0, u.jsxs)(v, {
                                children: [
                                  (0, u.jsx)(f, {
                                    to: "/results",
                                    children: " Result ",
                                  }),
                                  (0, u.jsx)(f, {
                                    to: "/facilities/library",
                                    children: " Facilities ",
                                  }),
                                  (0, u.jsx)(f, {
                                    to: "/contact-us",
                                    children: " Contact us ",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, u.jsxs)(r.Ay, {
                        item: !0,
                        xs: 12,
                        lg: 3,
                        md: 6,
                        sm: 6,
                        children: [
                          (0, u.jsx)(k, {
                            textAlign: "center",
                            children: "FOLLOW US",
                          }),
                          (0, u.jsxs)(C, {
                            sx: { paddingBottom: "20px" },
                            children: [
                              " ",
                              (0, u.jsxs)(f, {
                                to:
                                  null === e || void 0 === e
                                    ? void 0
                                    : e.facebookUrl,
                                target: "_blank",
                                children: [
                                  " ",
                                  (0, u.jsx)(d.A, { size: 20 }),
                                  " ",
                                ],
                              }),
                              (0, u.jsx)(f, {
                                to:
                                  null === e || void 0 === e
                                    ? void 0
                                    : e.twitterUrl,
                                target: "_blank",
                                children: (0, u.jsx)(x.A, { size: 20 }),
                              }),
                              (0, u.jsxs)(f, {
                                to:
                                  null === e || void 0 === e
                                    ? void 0
                                    : e.instagramUrl,
                                target: "_blank",
                                children: [(0, u.jsx)(h.A, { size: 25 }), " "],
                              }),
                            ],
                          }),
                          (0, u.jsxs)(C, {
                            children: [
                              (0, u.jsx)(f, {
                                to:
                                  null === e || void 0 === e
                                    ? void 0
                                    : e.googleAnalyticsId,
                                target: "_blank",
                                children: (0, u.jsx)(j.A, { size: 25 }),
                              }),
                              (0, u.jsxs)(f, {
                                to:
                                  null === e || void 0 === e
                                    ? void 0
                                    : e.youtubeUrl,
                                target: "_blank",
                                children: [(0, u.jsx)(p.A, { size: 20 }), " "],
                              }),
                              (0, u.jsxs)(f, {
                                to:
                                  null === e || void 0 === e
                                    ? void 0
                                    : e.linkedinUrl,
                                target: "_blank",
                                children: [(0, u.jsx)(g.A, { size: 25 }), " "],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, u.jsxs)(r.Ay, {
                        item: !0,
                        xs: 12,
                        lg: 3,
                        md: 6,
                        sm: 6,
                        children: [
                          (0, u.jsx)(k, {
                            textAlign: "center",
                            children: "ADDRESS",
                          }),
                          (0, u.jsx)(z, {
                            children: (0, u.jsx)(A, {
                              textAlign: "center",
                              children:
                                null === e || void 0 === e ? void 0 : e.address,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, u.jsx)(a.A, {
                sx: { background: "#212121", padding: "5px 0px" },
                children: (0, u.jsxs)(r.Ay, {
                  container: !0,
                  spacing: 2,
                  sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                      md: "row",
                      lg: "row",
                    },
                  },
                  children: [
                    (0, u.jsx)(r.Ay, {
                      item: !0,
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 6,
                      children: (0, u.jsx)(b, {
                        textAlign: "center",
                        children:
                          null === e || void 0 === e ? void 0 : e.websiteFooter,
                      }),
                    }),
                    (0, u.jsx)(r.Ay, {
                      item: !0,
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 6,
                      children: (0, u.jsx)(b, {
                        textAlign: "center",
                        children: (0, u.jsx)(f, {
                          to: "https://ecampusstreet.com/",
                          target: "_blank",
                          children: (0, u.jsxs)("span", {
                            children: [
                              "Powered by ",
                              (0, u.jsx)("span", { children: "eCampusStreet" }),
                            ],
                          }),
                        }),
                      }),
                    }),
                  ],
                }),
              }),
            ],
          });
        };
    },
    24897: (e, t, n) => {
      n.d(t, { A: () => M });
      var i = n(65043),
        l = n(96446),
        s = n(85865),
        o = n(30344),
        a = n(92314),
        r = n(55263),
        c = n(35721),
        d = n(30681),
        x = n(48734),
        h = n(42518),
        m = n(70378),
        p = n(90889),
        j = n(32143),
        g = n(17392),
        y = n(73216),
        u = n(35475),
        A = n(89611),
        b = n(86605),
        f = n(40710),
        k = n(21337),
        v = n(34535),
        w = n(26240),
        C = n(54536),
        z = n(3825),
        S = n(47196),
        I = n(6720),
        P = n(3538),
        q = n(31462),
        F = n(70579);
      const _ = [
        { title: "Home", path: "/", logo: (0, F.jsx)(z.n1E, {}) },
        {
          title: "About",
          logo: (0, F.jsx)(S.Poj, {}),
          dropdown: [
            { title: "Overview", path: "/about/overview" },
            { title: "About Founder", path: "/about/founder" },
            { title: "Vision & Mission", path: "/about/visionandmission" },
          ],
        },
        {
          title: "Pre-Admission",
          path: "/pre-admission",
          logo: (0, F.jsx)(P.zQ3, {}),
        },
        {
          title: "Gallery",
          path: "/home-gallery",
          logo: (0, F.jsx)(I.q0d, {}),
        },
        {
          title: "Facilities",
          logo: (0, F.jsx)(q.Oh2, {}),
          dropdown: [
            { title: "Library", path: "/facilities/library" },
            { title: "Transport", path: "/facilities/transport" },
            { title: "Dance & Singing", path: "/facilities/dance-and-singing" },
            { title: "Food", path: "/facilities/canteen" },
          ],
        },
        {
          title: "Assignment",
          path: "/assignment",
          logo: (0, F.jsx)(P.zQ3, {}),
        },
        { title: "Results", path: "/results", logo: (0, F.jsx)(P.zQ3, {}) },
        {
          title: "Contact Us",
          path: "/contact-us",
          logo: (0, F.jsx)(S.Q31, {}),
        },
      ];
      n.p;
      var D = n(73213),
        T = n(59893),
        L = n(81728),
        N = n(13059),
        U = n(87715);
      const E = (0, v.Ay)(l.A)((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: t.spacing(1),
            [t.breakpoints.down("md")]: { display: "none" },
          };
        }),
        W = (0, v.Ay)(s.A)({
          textTransform: "none",
          textDecoration: "none",
          fontSize: "16px",
          "&:hover": { color: D.A.darkPalette.primary.main },
        }),
        O = (0, v.Ay)(l.A)({
          position: "absolute",
          top: "100%",
          left: 0,
          width: "170px",
          backgroundColor: "#fff",
          zIndex: 1,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          borderTop: "3px solid ".concat(D.A.darkPalette.primary.main),
        }),
        R = (0, v.Ay)(s.A)({ fontSize: "16px", textTransform: "none" }),
        B = (0, v.Ay)(l.A)({
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        }),
        M = () => {
          const { selectedSetting: e } = (0, i.useContext)(L.A),
            [t, n] = (0, i.useState)(null),
            [v, z] = (0, i.useState)(""),
            [S, I] = (0, i.useState)(!1),
            P = (0, y.Zp)(),
            { pathname: q } = (0, y.zy)(),
            M = () => {
              n(null);
            },
            Q = () => {
              z("");
            };
          let G = (e) => {
            P(e);
          };
          const H = (0, w.A)(),
            V = (0, o.A)(H.breakpoints.between(900, 980));
          (0, i.useEffect)(() => {
            window.localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN) &&
              (async () => {
                try {
                  const { data: e } = await (0, U.Jt)(
                    N.h.account.checkIfLoggedIn
                  );
                  I(!0);
                } catch (e) {
                  window.localStorage.removeItem(
                    process.env.REACT_APP_ACCESS_TOKEN
                  ),
                    window.localStorage.removeItem(
                      process.env.REACT_APP_CURRENT_USER
                    ),
                    window.localStorage.removeItem("refresh_token"),
                    window.localStorage.removeItem(
                      process.env.REACT_APP_USER_TYPE
                    );
                }
              })();
          }, []);
          return (0, F.jsx)(i.Fragment, {
            children: (0, F.jsx)(a.A, {
              position: "sticky",
              sx: {
                backgroundColor: "#fff",
                color: "#333",
                height: "120px",
                px: { xs: 2, sm: 1, md: 1, lg: 10 },
              },
              children: (0, F.jsxs)(r.A, {
                disableGutters: !0,
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
                children: [
                  (0, F.jsx)(u.N_, {
                    to: "/",
                    style: { display: "flex", alignItems: "center" },
                    children: (0, F.jsx)("img", {
                      alt: "logo",
                      width: V ? 100 : 150,
                      height: 100,
                      src: e.logo,
                      style: {
                        objectFit: "contain",
                        textAlign: "center",
                        padding: "10px 0",
                      },
                    }),
                  }),
                  (0, F.jsxs)(E, {
                    children: [
                      _.map((e) =>
                        e.dropdown
                          ? (0, F.jsxs)(
                              B,
                              {
                                onMouseEnter: () => {
                                  return (t = e.title), void z(t);
                                  var t;
                                },
                                onMouseLeave: Q,
                                children: [
                                  (0, F.jsx)(R, {
                                    sx: {
                                      color:
                                        q === e.path
                                          ? D.A.darkPalette.primary.main
                                          : "black",
                                      fontWeight:
                                        q === e.path ? "bold" : "normal",
                                      mx: 0.5,
                                    },
                                    onClick: () => G(e.path),
                                    children: e.title,
                                  }),
                                  (0, F.jsx)(C.A, {}),
                                  v === e.title &&
                                    (0, F.jsx)(O, {
                                      children: (0, F.jsx)(c.A, {
                                        component: "nav",
                                        children: e.dropdown.map((e) =>
                                          (0, F.jsx)(
                                            d.Ay,
                                            {
                                              button: !0,
                                              component: u.N_,
                                              to: e.path,
                                              onClick: Q,
                                              children: (0, F.jsx)(x.A, {
                                                sx: {
                                                  fontWeight:
                                                    q === e.path
                                                      ? "bold"
                                                      : "normal",
                                                  color:
                                                    q === e.path
                                                      ? D.A.darkPalette.primary
                                                          .main
                                                      : "black",
                                                  "&:hover": {
                                                    color:
                                                      D.A.darkPalette.primary
                                                        .main,
                                                  },
                                                  my: 0.5,
                                                },
                                                primary: e.title,
                                              }),
                                            },
                                            e.title
                                          )
                                        ),
                                      }),
                                    }),
                                ],
                              },
                              e.title
                            )
                          : (0, F.jsx)(
                              W,
                              {
                                component: u.N_,
                                to: e.path,
                                onClick: () => G(e.path),
                                sx: {
                                  fontWeight: q === e.path ? "bold" : "normal",
                                  color:
                                    q === e.path
                                      ? D.A.darkPalette.primary.main
                                      : "inherit",
                                  mx: 0.5,
                                },
                                children: e.title,
                              },
                              e.title
                            )
                      ),
                      (0, F.jsx)(l.A, {
                        sx: { display: { xs: "none", md: "block" } },
                        children: (0, F.jsx)(h.A, {
                          startIcon: (0, F.jsx)(T.A, {
                            sx: { color: "#ffff" },
                          }),
                          variant: "contained",
                          size: "small",
                          sx: { backgroundColor: D.A.darkPalette.primary.main },
                          onClick: () => {
                            P(S ? "/sch/dashboard" : "login");
                          },
                          children: S ? "Dashboard" : "Login",
                        }),
                      }),
                    ],
                  }),
                  (0, F.jsxs)(l.A, {
                    sx: {
                      display: {
                        xs: "block",
                        sm: "block",
                        md: "none",
                        lg: "none",
                      },
                    },
                    children: [
                      (0, F.jsx)(m.A, {
                        id: "menu-appbar",
                        anchorEl: t,
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "right",
                        },
                        keepMounted: !0,
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "right",
                        },
                        open: Boolean(t),
                        onClose: M,
                        sx: { display: { xs: "block", md: "none" } },
                        children: _.map((e, t) =>
                          e.dropdown
                            ? (0, F.jsxs)(
                                p.A,
                                {
                                  sx: {
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                  },
                                  children: [
                                    (0, F.jsx)(b.A, {
                                      expandIcon: (0, F.jsx)(k.A, {}),
                                      "aria-controls": "submenu-".concat(
                                        e.title
                                      ),
                                      id: "submenu-".concat(e.title),
                                      children: (0, F.jsx)(s.A, {
                                        sx: {
                                          "&:hover": {
                                            color: D.A.darkPalette.primary.main,
                                          },
                                          color:
                                            q === e.path
                                              ? D.A.darkPalette.primary.main
                                              : "inherit",
                                        },
                                        children: e.title,
                                      }),
                                    }),
                                    (0, F.jsx)(f.A, {
                                      children: (0, F.jsx)(l.A, {
                                        sx: {
                                          display: "flex",
                                          flexDirection: "column",
                                        },
                                        children: e.dropdown.map((e) =>
                                          (0, F.jsx)(
                                            u.N_,
                                            {
                                              to: e.path,
                                              style: {
                                                textDecoration: "none",
                                                color:
                                                  q === e.path
                                                    ? D.A.darkPalette.primary
                                                        .main
                                                    : "inherit",
                                              },
                                              onClick: M,
                                              children: (0, F.jsx)(j.A, {
                                                sx: {
                                                  "&:hover": {
                                                    color:
                                                      D.A.darkPalette.primary
                                                        .main,
                                                  },
                                                },
                                                onClick: M,
                                                children: e.title,
                                              }),
                                            },
                                            e.title
                                          )
                                        ),
                                      }),
                                    }),
                                  ],
                                },
                                t
                              )
                            : (0, F.jsx)(
                                u.N_,
                                {
                                  to: e.path,
                                  style: {
                                    textDecoration: "none",
                                    color: "#333",
                                  },
                                  onClick: M,
                                  children: (0, F.jsx)(j.A, {
                                    sx: {
                                      "&:hover": {
                                        color: D.A.darkPalette.primary.main,
                                        backgroundColor: "transparent",
                                      },
                                      color:
                                        q === e.path
                                          ? D.A.darkPalette.primary.main
                                          : "inherit",
                                    },
                                    onClick: M,
                                    children: e.title,
                                  }),
                                },
                                e.title
                              )
                        ),
                      }),
                      (0, F.jsx)(g.A, {
                        size: "large",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: (e) => {
                          n(e.currentTarget);
                        },
                        sx: { display: { xs: "block", md: "none" } },
                        children: (0, F.jsx)(A.A, {}),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        };
    },
    34325: (e, t, n) => {
      n.d(t, { A: () => v });
      var i = n(68903),
        l = n(42518),
        s = n(85865),
        o = n(88911),
        a = n(70378),
        r = n(32143),
        c = n(65043),
        d = n(49336),
        x = n(37402),
        h = n(34535),
        m = n(54536),
        p = n(73213),
        j = n(73216),
        g = n(35475),
        y = (n(22011), n(81728)),
        u = n(70579);
      const A = (0, h.Ay)(i.Ay)((e) => {
          let { theme: t } = e;
          return {
            backgroundColor: "#C8C8C8",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "10px 80px",
            [t.breakpoints.down("sm")]: { padding: "10px " },
          };
        }),
        b = (0, h.Ay)(i.Ay)((e) => {
          let { theme: t } = e;
          return { padding: "10px", gap: "20px" };
        }),
        f = (0, h.Ay)(i.Ay)((e) => {
          let { theme: t } = e;
          return { display: "flex", gap: "10px", alignItems: "center" };
        }),
        k = (0, h.Ay)(l.A)((e) => {
          let { theme: t } = e;
          return {
            backgroundColor: p.A.darkPalette.secondary.main,
            "&:hover": { backgroundColor: p.A.darkPalette.secondary.main },
            [t.breakpoints.down("sm")]: { fontSize: "11px" },
          };
        });
      function v() {
        (0, j.Zp)();
        const {
            settings: e,
            setSelectedSetting: t,
            selectedSetting: n,
          } = (0, c.useContext)(y.A),
          [i, l] = (0, c.useState)(null),
          h = () => {
            l(null);
          };
        return (0, u.jsx)(u.Fragment, {
          children: (0, u.jsxs)(A, {
            children: [
              (0, u.jsxs)(b, {
                container: !0,
                children: [
                  (0, u.jsxs)(f, {
                    children: [
                      (0, u.jsx)(d.A, {
                        sx: {
                          color: "".concat(p.A.darkPalette.secondary.main),
                        },
                        fontSize: "small",
                      }),
                      (0, u.jsxs)(s.A, {
                        variant: "body2",
                        fontWeight: "bold",
                        color: "black",
                        children: ["+91 ", n.phone ? n.phone : "9999999999"],
                      }),
                    ],
                  }),
                  (0, u.jsxs)(f, {
                    children: [
                      (0, u.jsx)(x.A, {
                        sx: {
                          color: "".concat(p.A.darkPalette.secondary.main),
                        },
                        fontSize: "small",
                      }),
                      (0, u.jsxs)(g.N_, {
                        to: "mailto:".concat(
                          n.email ? n.email : "abc@gmail.com"
                        ),
                        style: {
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "bold",
                        },
                        children: [" ", n.email ? n.email : "abc@gmail.com"],
                      }),
                    ],
                  }),
                ],
              }),
              (0, u.jsx)(o.A, {
                sx: {
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                },
                direction: { xs: "column", sm: "row" },
                spacing: 2,
                children:
                  e.length >= 1 &&
                  (0, u.jsxs)(u.Fragment, {
                    children: [
                      (0, u.jsx)(k, {
                        variant: "contained",
                        onClick: (e) => {
                          l(e.currentTarget);
                        },
                        size: "small",
                        endIcon: (0, u.jsx)(m.A, {}),
                        children: n.name || "NA",
                      }),
                      (0, u.jsx)(a.A, {
                        anchorEl: i,
                        open: Boolean(i),
                        onClose: h,
                        children: e.map((e, n) =>
                          (0, u.jsx)(
                            r.A,
                            {
                              onClick: () =>
                                ((e) => {
                                  t(e), h();
                                })(e),
                              children: e.name,
                            },
                            e.name + n
                          )
                        ),
                      }),
                    ],
                  }),
              }),
            ],
          }),
        });
      }
    },
  },
]);
//# sourceMappingURL=3461.dbbb32ea.chunk.js.map
