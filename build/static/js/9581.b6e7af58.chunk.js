/** @format */

"use strict";
(self.webpackChunkschoolerp = self.webpackChunkschoolerp || []).push([
  [9581, 6305, 4401],
  {
    29541: (e, t, n) => {
      n.d(t, { A: () => g });
      var i = n(96446),
        s = n(65043),
        a = n(34535),
        l = n(85865),
        r = n(88911),
        o = n(53193),
        d = n(18356),
        c = n(72221),
        h = n(32143),
        x = n(54536),
        m = n(81728),
        p = n(70579);
      const u = (0, a.Ay)(i.A)((e) => {
        let { theme: t } = e;
        return {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginBottom: "20px",
          borderBottom: "1px solid",
          borderBottomColor: t.palette.primary.light,
        };
      });
      function g(e) {
        let { title: t = "", showTextField: n = !0 } = e;
        const {
          settings: i,
          setSettings: a,
          selectedSetting: g,
          setSelectedSetting: f,
        } = (0, s.useContext)(m.A);
        return (0, p.jsxs)(u, {
          children: [
            (0, p.jsx)(l.A, {
              component: "h1",
              sx: { fontWeight: "bold", color: "#fff" },
              children: t,
            }),
            n &&
              (0, p.jsx)(r.A, {
                direction: "row",
                spacing: 2,
                children: (0, p.jsxs)(o.A, {
                  fullWidth: !0,
                  size: "small",
                  sx: { minWidth: "200px" },
                  children: [
                    (0, p.jsx)(d.A, {
                      id: "demo-simple-select-label",
                      children: "Select School",
                    }),
                    (0, p.jsx)(c.A, {
                      labelId: "demo-simpless-select-filled-label",
                      id: "demo-simple-select-filled-l",
                      value: null === g || void 0 === g ? void 0 : g._id,
                      name: "setting",
                      onChange: (e) => {
                        const { name: t, value: n } = e.target;
                        f({ ...i.filter((e) => e._id == n)[0] });
                      },
                      IconComponent: (e) =>
                        (0, p.jsx)(x.A, { ...e, fontSize: "medium" }),
                      label: "Select school",
                      children:
                        null === i || void 0 === i
                          ? void 0
                          : i.map((e) =>
                              (0, p.jsx)(
                                h.A,
                                { value: e._id, children: e.name },
                                e._id
                              )
                            ),
                    }),
                  ],
                }),
              }),
          ],
        });
      }
    },
    22011: (e, t, n) => {
      n.d(t, { A: () => c });
      var i = n(65043),
        s = n(96446),
        a = n(68903),
        l = n(73213),
        r = n(47533),
        o = n(81728),
        d = n(70579);
      function c(e) {
        let { onThemeSelect: t = () => {}, webTheme: n } = e;
        const { selectedSetting: c } = i.useContext(o.A),
          { setSelectedTheme: h } = i.useContext(r.A),
          [x, m] = i.useState(
            (null === c || void 0 === c ? void 0 : c.selectedTheme) || 1
          ),
          [p, u] = i.useState(1);
        return (0, d.jsx)(i.Fragment, {
          children: (0, d.jsx)(s.A, {
            dividers: !0,
            children: (0, d.jsx)(a.Ay, {
              spacing: 2,
              container: !0,
              children: n
                ? l.A.websiteThemes.map((e) =>
                    (0, d.jsx)(
                      a.Ay,
                      {
                        item: !0,
                        sx: {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        children: (0, d.jsx)("div", {
                          onClick: () => {
                            return (n = e.theme), t(n), void m(n);
                            var n;
                          },
                          children: (0, d.jsx)("img", {
                            style: {
                              height: "150px",
                              width: "200px",
                              objectFit: "contain",
                              border:
                                parseInt(x) === e.theme
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
                : l.A.idCardThemes.map((e) =>
                    (0, d.jsx)(
                      a.Ay,
                      {
                        item: !0,
                        sx: {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        children: (0, d.jsx)("div", {
                          onClick: () => {
                            return (n = e.theme), t(n), void u(n);
                            var n;
                          },
                          children: (0, d.jsx)("img", {
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
    88441: (e, t, n) => {
      n.r(t), n.d(t, { default: () => ke });
      var i = n(65043),
        s = n(73216),
        a = n(34325),
        l = n(35475),
        r = n(34535),
        o = n(96446),
        d = n(35721),
        c = n(32143),
        h = n(85865),
        x = n(90889),
        m = n(86605),
        p = n(40710),
        u = n(42518),
        g = n(70378),
        f = n(17392),
        j = n(94109),
        A = n(70579);
      const b = (e) => {
        let { onClick: t, title: n, open: i, isSelected: s, pathname: a } = e;
        return (0, A.jsx)(A.Fragment, {
          children: (0, A.jsx)(o.A, {
            onClick: t,
            open: i,
            sx: {
              cursor: "pointer",
              borderBottom: s ? "2px solid white" : "none",
            },
            children: (0, A.jsx)(l.N_, {
              to: a,
              style: { textDecoration: "none" },
              children: (0, A.jsx)(h.A, {
                component: "div",
                sx: { fontWeight: "bold", color: "white" },
                children: n,
              }),
            }),
          }),
        });
      };
      var y = n(81728);
      const v = n.p + "static/media/kaykalogo.aeffba7a3f4a80fd6a19.png";
      var k = n(89611),
        w = n(21337),
        S = n(73213),
        C = n(13059),
        D = n(87715);
      const z = (0, r.Ay)("ul")((e) => {
          let { theme: t } = e;
          return {
            "& li": {
              listStyle: "none",
              padding: "10px",
              float: "left",
              margin: "0px 10px 0px 0px",
              textAlign: "center",
              cursor: "pointer",
              alignItems: "center",
            },
          };
        }),
        _ = (0, r.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return {
            "& ul li::after": {
              content: "''",
              backgroundColor: "white",
              display: "block",
              transition: "width 0.5s",
              width: 0,
              height: "2px",
            },
            "& ul li:hover::after": { width: "100%" },
          };
        }),
        F = (0, r.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return { [t.breakpoints.up("lg")]: { display: "none" } };
        }),
        N = (0, r.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
            position: "absolute",
            background: "transparent",
            borderBottom: "0.1px solid #828998",
          };
        });
      function I() {
        let e = (0, s.Zp)();
        const { pathname: t } = (0, s.zy)(),
          { selectedSetting: n } = (0, i.useContext)(y.A),
          [a, r] = (0, i.useState)(!1),
          [I, M] = (0, i.useState)(!1),
          [W, T] = (0, i.useState)(null),
          H = Boolean(W),
          [B, P] = (0, i.useState)(null),
          Y = Boolean(B),
          [q, U] = i.useState({ right: !1 });
        (0, i.useEffect)(() => {
          window.localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN) &&
            (async () => {
              try {
                const { data: e } = await (0, D.Jt)(
                  C.h.account.checkIfLoggedIn
                );
                r(!0);
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
        const E = (e) => (t) => {
          ("keydown" !== t.type || ("Tab" !== t.key && "Shift" !== t.key)) &&
            U({ ...q, right: e });
        };
        let R = (t) => {
          e(t);
        };
        const L = [
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            variant: "contained",
            title: "Home",
            path: "/",
          },
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            "aria-expanded": H ? "true" : void 0,
            onClick: (e) => {
              T(e.currentTarget);
            },
            variant: "contained",
            title: "About",
            items: [
              { title: "About us", pathName: "/about/overview" },
              { title: "About Founder", pathName: "/about/founder" },
              {
                title: " Vision & Mission",
                pathName: "/about/vision-and-mission",
              },
            ],
          },
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            variant: "contained",
            title: "Pre-Admission ",
            path: "/pre-admission",
          },
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            variant: "contained",
            title: "Gallery",
            path: "/home-gallery",
          },
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            "aria-expanded": "true",
            "aria-expanded": Y ? "true" : void 0,
            onClick: (e) => {
              P(e.currentTarget);
            },
            variant: "contained",
            title: "Facilities",
            items: [
              { title: "Food", pathName: "/facilities/canteen" },
              { title: "Library", pathName: "/library" },
              { title: "Transport", pathName: "/transport" },
              {
                title: "Dance And Singing",
                pathName: "/facilities/dance-and-singing",
              },
              { title: "Lab Facilities", pathName: "/facilities/labs" },
            ],
          },
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            variant: "contained",
            title: "Assignment",
            path: "/assignment",
          },
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            variant: "contained",
            title: "Results",
            path: "/results",
          },
          {
            href: "#",
            id: "button",
            "aria-haspopup": "true",
            variant: "contained",
            title: "Contact us ",
            path: "/contact-us",
          },
        ];
        return (0, A.jsx)(A.Fragment, {
          children: (0, A.jsxs)(N, {
            children: [
              (0, A.jsx)(l.N_, {
                to: "/",
                children: (0, A.jsx)("img", {
                  height: 100,
                  width: 120,
                  src: (null === n || void 0 === n ? void 0 : n.logo) || v,
                  style: {
                    paddingLeft: {
                      xs: "10px",
                      sm: "10px",
                      md: "10px",
                      lg: "80px",
                    },
                  },
                }),
              }),
              (0, A.jsx)(_, {
                sx: {
                  display: { xs: "none", sm: "none", md: "block", lg: "block" },
                  marginRight: { xs: 0, sm: 0, md: 0, lg: "80px" },
                },
                children: (0, A.jsxs)(z, {
                  variant: "ul",
                  children: [
                    L &&
                      L.map((e, n) =>
                        (0, A.jsx)(
                          i.Fragment,
                          {
                            children: (0, A.jsx)("li", {
                              children: (0, A.jsx)(b, {
                                title: e.title,
                                onClick: e.onClick,
                                open: e.open,
                                pathname: e.path,
                                isSelected: t === e.path,
                              }),
                            }),
                          },
                          n
                        )
                      ),
                    (0, A.jsx)(l.N_, {
                      to: a ? "/sch/dashboard" : "/login",
                      children: (0, A.jsx)(u.A, {
                        variant: "contained",
                        size: "small",
                        sx: { mt: "8px" },
                        children: a ? "Dashboard" : "Log In",
                      }),
                    }),
                    (0, A.jsxs)(g.A, {
                      id: "about",
                      anchorEl: W,
                      open: H,
                      onClick: () => {
                        T(null);
                      },
                      style: {
                        marginTop: "4%",
                        Width: "15%",
                        textAlign: "center",
                      },
                      children: [
                        (0, A.jsx)(l.N_, {
                          to: "/about/overview",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/about/overview" == t ? "orangered" : "black",
                            },
                            children: "Overview",
                          }),
                        }),
                        (0, A.jsx)(l.N_, {
                          to: "/about/founder",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/about/founder" == t ? "orangered" : "black",
                            },
                            children: "About Founder",
                          }),
                        }),
                        (0, A.jsx)(l.N_, {
                          to: "/about/vision-and-mission",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/about/vision-and-mission" == t
                                  ? "orangered"
                                  : "black",
                            },
                            children: "Vision & Mission",
                          }),
                        }),
                      ],
                    }),
                    (0, A.jsxs)(g.A, {
                      id: "facilities",
                      anchorEl: B,
                      open: Y,
                      onClick: () => {
                        P(null);
                      },
                      style: {
                        marginTop: "4%",
                        Width: "15%",
                        textAlign: "center",
                      },
                      children: [
                        (0, A.jsx)(l.k2, {
                          to: "/facilities/food",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/facilities/food" == t ? "orangered" : "black",
                            },
                            children: "Food",
                          }),
                        }),
                        (0, A.jsx)(l.N_, {
                          to: "/facilities/library",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/facilities/library" == t
                                  ? "orangered"
                                  : "black",
                            },
                            children: "Library",
                          }),
                        }),
                        (0, A.jsx)(l.N_, {
                          to: "/facilities/transport",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/facilities/transport" == t
                                  ? "orangered"
                                  : "black",
                            },
                            children: "Transport",
                          }),
                        }),
                        (0, A.jsx)(l.N_, {
                          to: "/facilities/dance-and-singing",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/facilities/dance-and-singing" == t
                                  ? "orangered"
                                  : "black",
                            },
                            children: "Dance And Singing",
                          }),
                        }),
                        (0, A.jsx)(l.N_, {
                          to: "/facilities/labs",
                          style: { textDecoration: "none" },
                          children: (0, A.jsx)(c.A, {
                            style: {
                              color:
                                "/facilities/labs" == t ? "orangered" : "black",
                            },
                            children: "Lab Facilities",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, A.jsxs)(F, {
                sx: {
                  display: { xs: "block", sm: "block", md: "none", lg: "none" },
                },
                children: [
                  (0, A.jsx)(f.A, {
                    size: "large",
                    edge: "start",
                    color: "info",
                    "aria-label": "menu",
                    sx: { mr: 2 },
                    onClick: E(!0),
                    children: (0, A.jsx)(k.A, {}),
                  }),
                  (0, A.jsx)(j.Ay, {
                    anchor: "right",
                    open: q.right,
                    onClose: E(!1),
                    children: (0, A.jsxs)(o.A, {
                      sx: {
                        width: 250,
                        display: {
                          xs: "block",
                          sm: "block",
                          md: "none",
                          lg: "none",
                        },
                      },
                      role: "presentation",
                      onClick: E(!0),
                      onKeyDown: E(!0),
                      children: [
                        (0, A.jsx)(d.A, {
                          children: L.map((e, n) =>
                            (0, A.jsxs)(
                              i.Fragment,
                              {
                                children: [
                                  "Facilities" != e.title &&
                                    "About" != e.title &&
                                    (0, A.jsx)(c.A, {
                                      sx: { mt: 1 },
                                      onClick: () => R(e.path),
                                      children: (0, A.jsx)(h.A, {
                                        component: "div",
                                        sx: {
                                          color:
                                            t === e.path
                                              ? S.A.darkPalette.primary.main
                                              : "",
                                        },
                                        children: e.title,
                                      }),
                                    }),
                                  e.items &&
                                    (0, A.jsxs)(x.A, {
                                      children: [
                                        (0, A.jsx)(m.A, {
                                          expandIcon:
                                            e.items && (0, A.jsx)(w.A, {}),
                                          "aria-controls": "panel1a-content",
                                          id: "panel1a-header",
                                          children: (0, A.jsx)(h.A, {
                                            children: e.title,
                                          }),
                                        }),
                                        (0, A.jsx)(p.A, {
                                          children:
                                            e.items &&
                                            e.items.map((e, n) =>
                                              (0, A.jsx)(
                                                i.Fragment,
                                                {
                                                  children: (0, A.jsx)(c.A, {
                                                    onClick: () =>
                                                      R(e.pathName),
                                                    children: (0, A.jsx)(h.A, {
                                                      component: "div",
                                                      sx: {
                                                        color:
                                                          t === e.pathName
                                                            ? "red"
                                                            : "",
                                                      },
                                                      children: e.title,
                                                    }),
                                                  }),
                                                },
                                                n
                                              )
                                            ),
                                        }),
                                      ],
                                    }),
                                ],
                              },
                              n
                            )
                          ),
                        }),
                        (0, A.jsx)(l.N_, {
                          to: a ? "/sch/dashboard" : "/login",
                          children: (0, A.jsx)(u.A, {
                            fullWidth: !0,
                            variant: "contained",
                            size: "small",
                            style: { margin: "10px", maxWidth: 230 },
                            children: a ? "Dashboard" : "Log In",
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      var M = n(68903),
        W = n(88911),
        T = n(49804),
        H = n(31462),
        B = n(32620),
        P = n(60348),
        Y = n(53417),
        q = n(47734);
      const U = (0, r.Ay)(P.A)((e) => {
          let { theme: t } = e;
          return {
            color: "#fff",
            transition: "1s",
            "&:hover": { color: "#1877F2" },
          };
        }),
        E = (0, r.Ay)(H.ZZd)((e) => {
          let { theme: t } = e;
          return {
            color: "#fff",
            transition: "1s",
            "&:hover": { color: "#FF0000" },
          };
        }),
        R = (0, r.Ay)(T.LnC)((e) => {
          let { theme: t } = e;
          return {
            color: "#fff",
            transition: "1s",
            "&:hover": { color: "#0077B5" },
          };
        }),
        L = (0, r.Ay)(B.PM6)((e) => {
          let { theme: t } = e;
          return {
            color: "#fff",
            transition: "1s",
            "&:hover": { color: "#C6352F" },
          };
        }),
        G = (0, r.Ay)(Y.A)((e) => {
          let { theme: t } = e;
          return {
            color: "#fff",
            transition: "1s",
            "&:hover": { color: "#1DA1F2" },
          };
        }),
        V = (0, r.Ay)(q.A)((e) => {
          let { theme: t } = e;
          return {
            color: "#fff",
            transition: "1s",
            fontSize: 25,
            "&:hover": {
              backgroundImage:
                "linear-gradient(to right, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)",
            },
          };
        }),
        Z = (0, r.Ay)(M.Ay)((e) => {
          let { theme: t } = e;
          return {
            height: "auto",
            backgroundColor: "#12141b",
            color: "#CDCDCD",
          };
        }),
        J = (0, r.Ay)(h.A)((e) => {
          let { theme: t } = e;
          return {
            color: "white",
            padding: "20px 0",
            fontSize: 25,
            fontWeight: 600,
          };
        }),
        O = (0, r.Ay)(h.A)((e) => {
          let { theme: t } = e;
          return {
            color: "#fff",
            fontSize: 16,
            fontFamily: "sans-serif",
            "&:hover": {
              borderBottom: "1px solid ".concat(
                S.A.darkPalette.primary.main,
                " "
              ),
              transition: "0.8s",
              color: S.A.darkPalette.primary.main,
              transitionTimingFunction: "ease-in-out",
            },
          };
        }),
        X = (0, r.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return {
            backgroundColor: "#090a0e",
            color: "#ffffff",
            minHeight: "50px",
            display: "flex",
            alignItems: "center",
            padding: "0 30px",
          };
        });
      function K() {
        const { selectedSetting: e } = (0, i.useContext)(y.A);
        return (0, A.jsxs)(A.Fragment, {
          children: [
            (0, A.jsxs)(Z, {
              container: !0,
              spacing: 2,
              sx: { px: { xs: 2, sm: 3, md: "100px" } },
              children: [
                (0, A.jsxs)(M.Ay, {
                  item: !0,
                  xs: 12,
                  md: 6,
                  lg: 4,
                  sx: { display: "flex", flexDirection: "column" },
                  children: [
                    (0, A.jsx)(J, { variant: "h5", children: "Contact us" }),
                    (0, A.jsx)(W.A, {
                      sx: { display: "flex" },
                      children: (0, A.jsxs)(h.A, {
                        sx: { color: "#CDCDCD", fontSize: 16 },
                        children: [
                          (0, A.jsx)("b", {
                            style: { color: S.A.darkPalette.primary.main },
                            children: "Address:\xa0",
                          }),
                          e.address,
                        ],
                      }),
                    }),
                    (0, A.jsxs)(h.A, {
                      variant: "body2",
                      color: "#fff",
                      fontSize: 16,
                      children: [
                        (0, A.jsx)("b", {
                          style: { color: S.A.darkPalette.primary.main },
                          children: "Email:",
                        }),
                        "\xa0",
                        e.email ? e.email : "abc@gmail.com",
                      ],
                    }),
                    (0, A.jsxs)(h.A, {
                      variant: "body2",
                      color: "#fff",
                      fontSize: 16,
                      children: [
                        (0, A.jsx)("b", {
                          style: { color: S.A.darkPalette.primary.main },
                          children: "Phone:",
                        }),
                        "\xa0 +91",
                        e.phone ? e.phone : "9878798777",
                      ],
                    }),
                    (0, A.jsxs)(o.A, {
                      sx: { display: "flex", gap: 3, padding: "5px 0" },
                      children: [
                        e.facebookUrl
                          ? (0, A.jsx)(l.N_, {
                              to: e.facebookUrl,
                              target: "_blank",
                              children: (0, A.jsx)(U, {}),
                            })
                          : null,
                        null !== e && void 0 !== e && e.gplusUrl
                          ? (0, A.jsx)(l.N_, {
                              to: e.gplusUrl,
                              target: "_blank",
                              children: (0, A.jsx)(L, { size: 25 }),
                            })
                          : null,
                        null !== e && void 0 !== e && e.linkedinUrl
                          ? (0, A.jsx)(l.N_, {
                              to: e.linkedinUrl,
                              target: "_blank",
                              children: (0, A.jsx)(R, { size: 25 }),
                            })
                          : null,
                        null !== e && void 0 !== e && e.youtubeUrl
                          ? (0, A.jsx)(l.N_, {
                              to: e.youtubeUrl,
                              target: "_blank",
                              children: (0, A.jsx)(E, { size: 25 }),
                            })
                          : null,
                        e.twitterUrl
                          ? (0, A.jsx)(l.N_, {
                              to: e.twitterUrl,
                              target: "_blank",
                              children: (0, A.jsx)(G, {}),
                            })
                          : null,
                        e.instagramUrl
                          ? (0, A.jsx)(l.N_, {
                              to: e.instagramUrl,
                              target: "_blank",
                              children: (0, A.jsx)(V, {}),
                            })
                          : null,
                      ],
                    }),
                  ],
                }),
                (0, A.jsxs)(M.Ay, {
                  item: !0,
                  xs: 12,
                  md: 6,
                  lg: 3,
                  children: [
                    (0, A.jsx)(J, { variant: "h5", children: "Quick Links" }),
                    (0, A.jsx)(l.N_, {
                      to: "/about/overview",
                      style: { textDecoration: "none" },
                      children: (0, A.jsx)(O, {
                        variant: "span",
                        children: "Overview",
                      }),
                    }),
                    (0, A.jsx)(h.A, {
                      children: (0, A.jsx)(l.N_, {
                        to: "/about/founder",
                        style: { textDecoration: "none" },
                        children: (0, A.jsx)(O, {
                          variant: "span",
                          children: "About Founder",
                        }),
                      }),
                    }),
                    (0, A.jsx)(h.A, {
                      children: (0, A.jsx)(l.N_, {
                        to: "/results",
                        style: { textDecoration: "none" },
                        children: (0, A.jsx)(O, {
                          variant: "span",
                          children: "Results",
                        }),
                      }),
                    }),
                    (0, A.jsx)(h.A, {
                      children: (0, A.jsx)(l.N_, {
                        to: "/home-gallery",
                        style: { textDecoration: "none" },
                        children: (0, A.jsx)(O, {
                          variant: "span",
                          children: "Gallery",
                        }),
                      }),
                    }),
                    (0, A.jsx)(h.A, {
                      children: (0, A.jsx)(l.N_, {
                        to: "/about/vision-and-mission",
                        style: { textDecoration: "none" },
                        children: (0, A.jsx)(O, {
                          variant: "span",
                          children: " Vision and Mission",
                        }),
                      }),
                    }),
                  ],
                }),
                (0, A.jsxs)(M.Ay, {
                  item: !0,
                  xs: 12,
                  md: 12,
                  lg: 5,
                  children: [
                    (0, A.jsx)(J, {
                      variant: "h5",
                      textAlign: "center",
                      children: "Find Us Here",
                    }),
                    (0, A.jsx)(o.A, {
                      children: (0, A.jsx)("iframe", {
                        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.43319155182!2d77.55235837528166!3d13.008063114077418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bbc051f1ab%3A0x5b567d40d77191c6!2sWebspruce!5e0!3m2!1sen!2sin!4v1694703840631!5m2!1sen!2sin%22",
                        width: "100%",
                        height: "150",
                        frameBorder: "0",
                        allowFullScreen: "",
                        "aria-hidden": "false",
                        tabIndex: "0",
                        style: {
                          borderRadius: "10px",
                          filter: "grayscale(80%)",
                        },
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, A.jsxs)(X, {
              sx: {
                display: "flex",
                justifyContent: { sm: "space-between", xs: "flex-start" },
                alignItems: "center",
                flexDirection: { sm: "row", xs: "column" },
              },
              children: [
                (0, A.jsx)(h.A, { children: e.websiteFooter }),
                (0, A.jsx)(h.A, {
                  sx: { color: "#fff" },
                  children: "Powered by eCampusStreet",
                }),
              ],
            }),
          ],
        });
      }
      var Q = n(23527);
      const $ = (0, r.Ay)(o.A)((e) => {
        let { theme: t } = e;
        return {
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1664463760781-f159dfe3af30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "150px",
          paddingBottom: "50px",
        };
      });
      function ee() {
        return (0, A.jsx)(A.Fragment, {
          children: (0, A.jsx)($, {
            children: (0, A.jsx)(Q.default, { show: !1 }),
          }),
        });
      }
      var te = n(52748);
      const ne = (0, r.Ay)(o.A)((e) => {
        let { theme: t } = e;
        return {
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1664463760781-f159dfe3af30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "150px",
        };
      });
      function ie() {
        return (0, A.jsx)(ne, {
          children: (0, A.jsx)(te.default, { show: !1 }),
        });
      }
      var se = n(59388);
      const ae = (0, r.Ay)(o.A)((e) => {
        let { theme: t } = e;
        return {
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1664463760781-f159dfe3af30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "150px",
        };
      });
      function le() {
        return (0, A.jsx)(ae, {
          children: (0, A.jsx)(se.default, { show: !1 }),
        });
      }
      var re = n(38663);
      const oe = (0, r.Ay)(o.A)((e) => {
        let { theme: t } = e;
        return {
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1664463760781-f159dfe3af30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "150px",
        };
      });
      function de() {
        return (0, A.jsx)(oe, {
          children: (0, A.jsx)(re.default, { show: !1 }),
        });
      }
      const ce = i.lazy(() =>
          Promise.all([
            n.e(9528),
            n.e(6178),
            n.e(1903),
            n.e(7346),
            n.e(1235),
          ]).then(n.bind(n, 52132))
        ),
        he = i.lazy(() => n.e(2484).then(n.bind(n, 52484))),
        xe = i.lazy(() => n.e(2951).then(n.bind(n, 12951))),
        me = i.lazy(() => n.e(8318).then(n.bind(n, 78318))),
        pe = i.lazy(() => n.e(4874).then(n.bind(n, 96605))),
        ue = i.lazy(() => n.e(887).then(n.bind(n, 40887))),
        ge = i.lazy(() => n.e(5599).then(n.bind(n, 30158))),
        fe = i.lazy(() => n.e(5933).then(n.bind(n, 85933))),
        je = i.lazy(() => n.e(7740).then(n.bind(n, 67740))),
        Ae = i.lazy(() =>
          Promise.all([n.e(5622), n.e(4741), n.e(681), n.e(6617)]).then(
            n.bind(n, 66617)
          )
        ),
        be = i.lazy(() =>
          Promise.all([n.e(9528), n.e(4451)]).then(n.bind(n, 24451))
        ),
        ye = i.lazy(() =>
          Promise.all([n.e(5622), n.e(9257), n.e(8292)]).then(n.bind(n, 88176))
        ),
        ve = i.lazy(() =>
          Promise.all([n.e(6720), n.e(2661), n.e(615)]).then(n.bind(n, 615))
        ),
        ke = () => {
          const e = (0, s.zy)();
          return (
            (0, i.useEffect)(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, [e.pathname]),
            window.location.pathname.startsWith("/sch")
              ? null
              : (0, A.jsxs)(A.Fragment, {
                  children: [
                    (0, A.jsx)(a.A, {}),
                    (0, A.jsx)(I, {}),
                    (0, A.jsx)(i.Suspense, {
                      fallback: (0, A.jsx)("div", { children: "Loading..." }),
                      children: (0, A.jsxs)(s.BV, {
                        children: [
                          (0, A.jsx)(s.qh, {
                            path: "/",
                            element: (0, A.jsx)(ce, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/about/overview",
                            element: (0, A.jsx)(he, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/about/founder",
                            element: (0, A.jsx)(xe, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/about/vision-and-mission",
                            element: (0, A.jsx)(me, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/facilities/food",
                            element: (0, A.jsx)(pe, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/facilities/library",
                            element: (0, A.jsx)(ue, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/facilities/transport",
                            element: (0, A.jsx)(ge, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/facilities/dance-and-singing",
                            element: (0, A.jsx)(fe, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/facilities/labs",
                            element: (0, A.jsx)(je, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/pre-admission",
                            element: (0, A.jsx)(Ae, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/home-gallery",
                            element: (0, A.jsx)(be, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/results",
                            element: (0, A.jsx)(ye, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/contact-us",
                            element: (0, A.jsx)(ve, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/assignment",
                            element: (0, A.jsx)(ee, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/award-details/:id",
                            element: (0, A.jsx)(ie, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/news-details/:id",
                            element: (0, A.jsx)(le, {}),
                          }),
                          (0, A.jsx)(s.qh, {
                            path: "/notice-details/:id",
                            element: (0, A.jsx)(de, {}),
                          }),
                        ],
                      }),
                    }),
                    (0, A.jsx)(K, {}),
                    (0, A.jsx)(s.sv, {}),
                  ],
                })
          );
        };
    },
    52748: (e, t, n) => {
      n.r(t), n.d(t, { default: () => f });
      var i = n(65043),
        s = n(73216),
        a = n(71198),
        l = n(34535),
        r = n(85865),
        o = n(63336),
        d = n(68903),
        c = n(96446),
        h = n(42518),
        x = n(60446),
        m = n.n(x),
        p = n(73213),
        u = n(70579);
      const g = (0, l.Ay)(r.A)((e) => {
          let { theme: t } = e;
          return {
            fontWeight: 700,
            color: p.A.darkPalette.primary.main,
            fontSize: "20px",
          };
        }),
        f = (e) => {
          var t;
          let { show: n } = e;
          const l = (0, s.zy)(),
            x =
              l.state &&
              (null === (t = l.state) || void 0 === t ? void 0 : t.awards),
            p = (0, s.Zp)();
          return (
            i.useEffect(() => {
              window.scrollTo(0, 0);
            }, []),
            (0, u.jsxs)(u.Fragment, {
              children: [
                (0, u.jsx)(a.A, {
                  show: n,
                  title: "Awards And Achievements",
                  leftSideHeader: "Home",
                  rightSideHeader: " Awards And Achievements",
                }),
                (0, u.jsx)(o.A, {
                  sx: { p: "15px", my: 2 },
                  children: (0, u.jsxs)(d.Ay, {
                    container: !0,
                    spacing: 2,
                    children: [
                      (0, u.jsx)(d.Ay, {
                        item: !0,
                        xs: 12,
                        md: 6,
                        sx: { order: { xs: 2, sm: 2, md: 1 } },
                        children: (0, u.jsx)("img", {
                          src:
                            null !== x && void 0 !== x && x.image
                              ? null === x || void 0 === x
                                ? void 0
                                : x.image
                              : "awards.png",
                          alt: "loading...",
                          style: { width: "100%", borderRadius: "5px" },
                        }),
                      }),
                      (0, u.jsxs)(d.Ay, {
                        item: !0,
                        xs: 12,
                        md: 6,
                        sx: { order: { xs: 1, sm: 1, md: 2 } },
                        children: [
                          null !== x && void 0 !== x && x.date
                            ? (0, u.jsx)(r.A, {
                                variant: "subtitle1",
                                sx: { color: "black", fontWeight: 600 },
                                children: m()(
                                  null === x || void 0 === x
                                    ? void 0
                                    : x.fromDate
                                ).format("MMM DD, YYYY"),
                              })
                            : (0, u.jsxs)(r.A, {
                                variant: "subtitle1",
                                sx: { color: "black", fontWeight: 600 },
                                children: [
                                  "Event Date",
                                  " ",
                                  ""
                                    .concat(
                                      m()(
                                        null === x || void 0 === x
                                          ? void 0
                                          : x.fromDate
                                      ).format("DD MMM, YYYY"),
                                      " -\n                "
                                    )
                                    .concat(
                                      m()(
                                        null === x || void 0 === x
                                          ? void 0
                                          : x.toDate
                                      ).format("DD MMM, YYYY")
                                    ),
                                ],
                              }),
                          (0, u.jsx)(g, {
                            variant: "subtitle1",
                            children:
                              null === x || void 0 === x ? void 0 : x.title,
                          }),
                          (0, u.jsxs)(r.A, {
                            variant: "subtitle1",
                            children: [
                              (0, u.jsx)("b", { children: " Hosted By: " }),
                              (0, u.jsx)("span", {
                                sx: { color: "black" },
                                children:
                                  null === x || void 0 === x
                                    ? void 0
                                    : x.hostedBy,
                              }),
                            ],
                          }),
                          (0, u.jsxs)(r.A, {
                            variant: "subtitle1",
                            children: [
                              (0, u.jsx)("b", { children: " Location: " }),
                              (0, u.jsx)("span", {
                                component: "span",
                                sx: { color: "black" },
                                children:
                                  null === x || void 0 === x
                                    ? void 0
                                    : x.location,
                              }),
                            ],
                          }),
                          (0, u.jsx)(r.A, {
                            variant: "subtitle1",
                            children:
                              null === x || void 0 === x
                                ? void 0
                                : x.shortEvent,
                          }),
                          (0, u.jsx)(r.A, {
                            variant: "subtitle1",
                            mt: 1,
                            children:
                              null === x || void 0 === x ? void 0 : x.note,
                          }),
                          (0, u.jsx)(c.A, {
                            sx: { mt: 1 },
                            children: (0, u.jsx)(h.A, {
                              size: "small",
                              variant: "outlined",
                              onClick: () => p("/"),
                              children: "Go Back",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            })
          );
        };
    },
    34325: (e, t, n) => {
      n.d(t, { A: () => k });
      var i = n(68903),
        s = n(42518),
        a = n(85865),
        l = n(88911),
        r = n(70378),
        o = n(32143),
        d = n(65043),
        c = n(49336),
        h = n(37402),
        x = n(34535),
        m = n(54536),
        p = n(73213),
        u = n(73216),
        g = n(35475),
        f = (n(22011), n(81728)),
        j = n(70579);
      const A = (0, x.Ay)(i.Ay)((e) => {
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
        b = (0, x.Ay)(i.Ay)((e) => {
          let { theme: t } = e;
          return { padding: "10px", gap: "20px" };
        }),
        y = (0, x.Ay)(i.Ay)((e) => {
          let { theme: t } = e;
          return { display: "flex", gap: "10px", alignItems: "center" };
        }),
        v = (0, x.Ay)(s.A)((e) => {
          let { theme: t } = e;
          return {
            backgroundColor: p.A.darkPalette.secondary.main,
            "&:hover": { backgroundColor: p.A.darkPalette.secondary.main },
            [t.breakpoints.down("sm")]: { fontSize: "11px" },
          };
        });
      function k() {
        (0, u.Zp)();
        const {
            settings: e,
            setSelectedSetting: t,
            selectedSetting: n,
          } = (0, d.useContext)(f.A),
          [i, s] = (0, d.useState)(null),
          x = () => {
            s(null);
          };
        return (0, j.jsx)(j.Fragment, {
          children: (0, j.jsxs)(A, {
            children: [
              (0, j.jsxs)(b, {
                container: !0,
                children: [
                  (0, j.jsxs)(y, {
                    children: [
                      (0, j.jsx)(c.A, {
                        sx: {
                          color: "".concat(p.A.darkPalette.secondary.main),
                        },
                        fontSize: "small",
                      }),
                      (0, j.jsxs)(a.A, {
                        variant: "body2",
                        fontWeight: "bold",
                        color: "black",
                        children: ["+91 ", n.phone ? n.phone : "9999999999"],
                      }),
                    ],
                  }),
                  (0, j.jsxs)(y, {
                    children: [
                      (0, j.jsx)(h.A, {
                        sx: {
                          color: "".concat(p.A.darkPalette.secondary.main),
                        },
                        fontSize: "small",
                      }),
                      (0, j.jsxs)(g.N_, {
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
              (0, j.jsx)(l.A, {
                sx: {
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                },
                direction: { xs: "column", sm: "row" },
                spacing: 2,
                children:
                  e.length >= 1 &&
                  (0, j.jsxs)(j.Fragment, {
                    children: [
                      (0, j.jsx)(v, {
                        variant: "contained",
                        onClick: (e) => {
                          s(e.currentTarget);
                        },
                        size: "small",
                        endIcon: (0, j.jsx)(m.A, {}),
                        children: n.name || "NA",
                      }),
                      (0, j.jsx)(r.A, {
                        anchorEl: i,
                        open: Boolean(i),
                        onClose: x,
                        children: e.map((e, n) =>
                          (0, j.jsx)(
                            o.A,
                            {
                              onClick: () =>
                                ((e) => {
                                  t(e), x();
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
    23527: (e, t, n) => {
      n.r(t), n.d(t, { default: () => C });
      var i = n(65043),
        s = n(71198),
        a = n(29541),
        l = n(96446),
        r = n(63336),
        o = n(68903),
        d = n(79650),
        c = n(71806),
        h = n(84882),
        x = n(28076),
        m = n(39652),
        p = n(73460),
        u = n(42518),
        g = n(85865),
        f = n(69652),
        j = n(63516),
        A = n(72812),
        b = n(13059),
        y = n(87715),
        v = n(60446),
        k = n.n(v),
        w = n(81728),
        S = n(70579);
      function C(e) {
        let { show: t } = e;
        const { selectedSetting: n } = (0, i.useContext)(w.A),
          [v, C] = (0, i.useState)([]),
          [D, z] = (0, i.useState)([]),
          [_, F] = (0, i.useState)([]),
          N = [{ label: "All", value: "all" }, ...D],
          [I, M] = (0, i.useState)(!1),
          W = async (e) => {
            try {
              if (
                (M(!0),
                "all" === (null === e || void 0 === e ? void 0 : e.section))
              ) {
                const { data: t } = await (0, y.Jt)(b.r.assignment.list, {
                  params: { schoolId: n._id, search: { class: e.class } },
                });
                F(t.result);
              } else {
                const { data: t } = await (0, y.Jt)(b.r.assignment.list, {
                  params: {
                    schoolId: n._id,
                    search: { class: e.class, section: e.section },
                  },
                });
                F(t.result);
              }
              M(!1);
            } catch (t) {
              console.log(t), M(!1);
            }
          },
          T = (0, j.Wx)({
            initialValues: { class: "", section: "" },
            onSubmit: W,
            enableReinitialize: !0,
          });
        (0, i.useEffect)(() => {
          (async () => {
            try {
              const { data: e } = await (0, y.Jt)(b.r.class.list, {
                params: { schoolId: n._id },
              });
              C(e.result.map((e) => ({ label: e.name, value: e._id }))),
                T.setFieldValue("class", e.result[0]._id);
            } catch (e) {
              console.log(e);
            }
          })();
        }, [n._id]),
          (0, i.useEffect)(() => {
            T.values.class &&
              ((async () => {
                try {
                  const { data: e } = await (0, y.Jt)(b.r.section.list, {
                    params: {
                      schoolId: n._id,
                      search: { class: T.values.class },
                    },
                  });
                  z(e.result.map((e) => ({ label: e.name, value: e._id }))),
                    T.setFieldValue("section", e.result[0]._id);
                } catch (e) {
                  console.log(e);
                }
              })(),
              W());
          }, [T.values.class, n._id]);
        return (0, S.jsxs)(S.Fragment, {
          children: [
            (0, S.jsx)(s.A, {
              show: t,
              title: "Assignment",
              leftSideHeader: "Home",
              rightSideHeader: "Assignment",
            }),
            (0, S.jsxs)(l.A, {
              sx: { margin: "15px", px: 4 },
              children: [
                (0, S.jsx)(a.A, { title: "Assignment", showTextField: !1 }),
                (0, S.jsx)(r.A, {
                  sx: { padding: 2, marginBottom: 2 },
                  children: (0, S.jsxs)(o.Ay, {
                    rowSpacing: 1,
                    columnSpacing: 2,
                    container: !0,
                    component: "form",
                    onSubmit: T.handleSubmit,
                    children: [
                      (0, S.jsx)(o.Ay, {
                        xs: 12,
                        md: 6,
                        lg: 3,
                        item: !0,
                        children: (0, S.jsx)(f.A, {
                          required: !0,
                          name: "class",
                          formik: T,
                          label: "Select Class",
                          options: v,
                        }),
                      }),
                      (0, S.jsx)(o.Ay, {
                        xs: 12,
                        md: 6,
                        lg: 3,
                        item: !0,
                        children: (0, S.jsx)(f.A, {
                          required: !0,
                          name: "section",
                          formik: T,
                          label: "Select Section",
                          options: N,
                        }),
                      }),
                      (0, S.jsx)(o.Ay, {
                        xs: 12,
                        md: 3,
                        lg: 2,
                        item: !0,
                        alignSelf: "center",
                        children: (0, S.jsx)(A.A, {
                          loading: I,
                          size: "small",
                          type: "submit",
                          variant: "contained",
                          children: "Find",
                        }),
                      }),
                    ],
                  }),
                }),
                (0, S.jsxs)(d.A, {
                  component: r.A,
                  children: [
                    (0, S.jsxs)(c.A, {
                      sx: { minWidth: 650 },
                      children: [
                        (0, S.jsx)(h.A, {
                          sx: {
                            backgroundColor: (e) =>
                              "dark" === e.palette.mode
                                ? e.palette.primary.dark
                                : e.palette.primary.light,
                          },
                          children: (0, S.jsxs)(x.A, {
                            children: [
                              (0, S.jsx)(m.A, {
                                align: "center",
                                children: "#SL",
                              }),
                              (0, S.jsx)(m.A, {
                                align: "center",
                                children: "Title",
                              }),
                              (0, S.jsx)(m.A, {
                                align: "center",
                                children: "Subject",
                              }),
                              (0, S.jsx)(m.A, {
                                align: "center",
                                children: "Created",
                              }),
                              (0, S.jsx)(m.A, {
                                align: "center",
                                children: "Action",
                              }),
                            ],
                          }),
                        }),
                        (0, S.jsx)(p.A, {
                          children: _.map((e, t) =>
                            (0, S.jsxs)(
                              x.A,
                              {
                                children: [
                                  (0, S.jsx)(m.A, {
                                    align: "center",
                                    children: t + 1,
                                  }),
                                  (0, S.jsx)(m.A, {
                                    align: "center",
                                    children:
                                      null === e || void 0 === e
                                        ? void 0
                                        : e.title,
                                  }),
                                  (0, S.jsx)(m.A, {
                                    align: "center",
                                    children:
                                      null === e || void 0 === e
                                        ? void 0
                                        : e.subject.name,
                                  }),
                                  (0, S.jsx)(m.A, {
                                    align: "center",
                                    children: k()(
                                      null === e || void 0 === e
                                        ? void 0
                                        : e.createdAt
                                    ).format("DD-MM-YYYY"),
                                  }),
                                  (0, S.jsxs)(m.A, {
                                    align: "center",
                                    children: [
                                      (null === e || void 0 === e
                                        ? void 0
                                        : e.file) &&
                                        (0, S.jsx)(u.A, {
                                          size: "small",
                                          color: "success",
                                          variant: "contained",
                                          onClick: () => {
                                            return (
                                              (t =
                                                null === e || void 0 === e
                                                  ? void 0
                                                  : e.file),
                                              void window.open(t, "_blank")
                                            );
                                            var t;
                                          },
                                          children: "Download",
                                        }),
                                      (null === e || void 0 === e
                                        ? void 0
                                        : e.link) &&
                                        (0, S.jsx)("a", {
                                          href:
                                            null === e || void 0 === e
                                              ? void 0
                                              : e.link,
                                          rel: "noreferrer",
                                          target: "_blank",
                                          children: (0, S.jsx)(u.A, {
                                            size: "small",
                                            color: "success",
                                            variant: "contained",
                                            children: "Link",
                                          }),
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              e._id
                            )
                          ),
                        }),
                      ],
                    }),
                    !_.length &&
                      (0, S.jsx)(g.A, {
                        variant: "h6",
                        sx: {
                          textAlign: "center",
                          margin: "5px",
                          padding: "5px",
                        },
                        children: "Assignment not found!",
                      }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
    59388: (e, t, n) => {
      n.r(t), n.d(t, { default: () => f });
      var i = n(65043),
        s = n(73216),
        a = n(71198),
        l = n(34535),
        r = n(85865),
        o = n(63336),
        d = n(68903),
        c = n(96446),
        h = n(42518),
        x = n(60446),
        m = n.n(x),
        p = n(73213),
        u = n(70579);
      const g = (0, l.Ay)(r.A)((e) => {
          let { theme: t } = e;
          return {
            fontWeight: 700,
            color: p.A.darkPalette.primary.main,
            fontSize: "20px",
          };
        }),
        f = (e) => {
          let { show: t } = e;
          const n = (0, s.zy)(),
            l = n.state && n.state.data,
            x = (0, s.Zp)();
          return (
            (0, i.useEffect)(() => {
              window.scrollTo(0, 0);
            }, []),
            (0, u.jsxs)(u.Fragment, {
              children: [
                (0, u.jsx)(a.A, {
                  show: t,
                  title: "News And Notice",
                  leftSideHeader: "Home",
                  rightSideHeader: "News And Notice",
                }),
                (0, u.jsx)(o.A, {
                  sx: { marginTop: "5px", m: 2, p: 2 },
                  children: (0, u.jsxs)(d.Ay, {
                    container: !0,
                    spacing: 2,
                    children: [
                      (0, u.jsx)(d.Ay, {
                        item: !0,
                        xs: 12,
                        md: 6,
                        sx: { order: { xs: 2, sm: 2, md: 1 } },
                        children: (0, u.jsx)("img", {
                          src: l.image ? l.image : "awards.png",
                          alt: "loading...",
                          style: { width: "100%", borderRadius: "5px" },
                        }),
                      }),
                      (0, u.jsxs)(d.Ay, {
                        item: !0,
                        xs: 12,
                        md: 6,
                        sx: { order: { xs: 1, sm: 1, md: 2 } },
                        children: [
                          (0, u.jsxs)(g, {
                            variant: "h4",
                            mb: 1,
                            children: ["News:", " "],
                          }),
                          (0, u.jsx)(r.A, {
                            sx: { color: "black", fontWeight: 600 },
                            children: m()(l.date).format("MMM DD, YYYY"),
                          }),
                          (0, u.jsx)(g, {
                            variant: "subtitle1",
                            children: l.title,
                          }),
                          (0, u.jsx)(r.A, {
                            variant: "subtitle1",
                            children: l.shortNews,
                          }),
                          (0, u.jsx)(r.A, {
                            variant: "subtitle1",
                            children: l.news,
                          }),
                          (0, u.jsx)(c.A, {
                            sx: { mt: 1 },
                            children: (0, u.jsx)(h.A, {
                              size: "small",
                              variant: "outlined",
                              onClick: () => x("/"),
                              children: "Go Back",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            })
          );
        };
    },
    38663: (e, t, n) => {
      n.r(t), n.d(t, { default: () => f });
      var i = n(65043),
        s = n(73216),
        a = n(71198),
        l = n(34535),
        r = n(85865),
        o = n(63336),
        d = n(68903),
        c = n(96446),
        h = n(42518),
        x = n(60446),
        m = n.n(x),
        p = n(73213),
        u = (n(66321), n(70579));
      const g = (0, l.Ay)(r.A)((e) => {
          let { theme: t } = e;
          return {
            fontWeight: 700,
            color: p.A.darkPalette.primary.main,
            fontSize: "20px",
          };
        }),
        f = (e) => {
          let { show: t } = e;
          const n = (0, s.zy)(),
            l = n.state && n.state.data,
            x = (0, s.Zp)();
          return (
            (0, i.useEffect)(() => {
              window.scrollTo(0, 0);
            }, []),
            (0, u.jsxs)(u.Fragment, {
              children: [
                (0, u.jsx)(a.A, {
                  show: t,
                  title: "News And Notice",
                  leftSideHeader: "Home",
                  rightSideHeader: "News And Notice",
                }),
                (0, u.jsxs)(o.A, {
                  sx: { marginTop: "5px", m: 2, p: 2 },
                  children: [
                    (0, u.jsxs)(g, {
                      variant: "h4",
                      mb: 1,
                      children: ["Notice:", " "],
                    }),
                    (0, u.jsx)(d.Ay, {
                      container: !0,
                      spacing: 2,
                      children: (0, u.jsxs)(d.Ay, {
                        item: !0,
                        xs: 12,
                        md: 6,
                        sx: { order: { xs: 1, sm: 1, md: 2 } },
                        children: [
                          (0, u.jsx)(r.A, {
                            sx: { color: "black", fontWeight: 600 },
                            children: m()(l.date).format("MMM DD, YYYY"),
                          }),
                          (0, u.jsx)(g, {
                            variant: "subtitle1",
                            children: l.title,
                          }),
                          (0, u.jsx)(r.A, {
                            variant: "subtitle1",
                            children: l.notice,
                          }),
                          (0, u.jsxs)(r.A, {
                            variant: "subtitle1",
                            children: [
                              (0, u.jsx)("b", { children: "Notice For: " }),
                              (0, u.jsx)("span", {
                                component: "span",
                                sx: { color: "black" },
                                children: l.noticeFor,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, u.jsx)(c.A, {
                      sx: { display: "flex", justifyContent: "flex-end", m: 1 },
                      children: (0, u.jsx)(h.A, {
                        size: "small",
                        variant: "outlined",
                        onClick: () => x("/"),
                        children: "Go Back",
                      }),
                    }),
                  ],
                }),
              ],
            })
          );
        };
    },
    71198: (e, t, n) => {
      n.d(t, { A: () => h });
      var i = n(34535),
        s = n(96446),
        a = n(85865);
      n(65043);
      const l = n.p + "static/media/HeaderImage.032f52496a04e01f804a.png";
      var r = n(35475),
        o = n(70579);
      const d = (0, i.Ay)(s.A)((e) => {
          let { theme: t } = e;
          return {
            color: "white",
            padding: "80px",
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(".concat(
                l,
                ")"
              ),
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            textAlign: "center",
            [t.breakpoints.down("sm")]: { padding: "15px" },
          };
        }),
        c = (0, i.Ay)(a.A)((e) => {
          let { theme: t } = e;
          return {
            fontSize: "40px",
            color: "#fff",
            [t.breakpoints.down("md")]: { fontSize: "30px" },
            [t.breakpoints.down("sm")]: { fontSize: "25px" },
          };
        });
      function h(e) {
        let {
          title: t = "",
          leftSideHeader: n = "",
          rightSideHeader: i = "",
          show: s = !0,
        } = e;
        return (0, o.jsx)(o.Fragment, {
          children:
            s &&
            (0, o.jsxs)(d, {
              variant: "h4",
              align: "center",
              children: [
                (0, o.jsx)(c, { children: t.toUpperCase() }),
                (0, o.jsxs)(a.A, {
                  sx: { color: "white" },
                  children: [
                    (0, o.jsx)(r.N_, {
                      to: "/",
                      style: { textDecoration: "none", color: "white" },
                      children: n.toUpperCase(),
                    }),
                    "\xa0 / ",
                    i.toUpperCase(),
                  ],
                }),
              ],
            }),
        });
      }
    },
    66321: (e, t, n) => {
      n.d(t, { A: () => A });
      var i,
        s = n(57528),
        a = (n(65043), n(73216)),
        l = n(34535),
        r = n(85865),
        o = n(83290),
        d = n(12110),
        c = n(96446),
        h = n(73213),
        x = n(60446),
        m = n.n(x),
        p = n(25545),
        u = n(70579);
      const g = (0, l.Ay)(r.A)((e) => {
          let { theme: t } = e;
          return {
            fontWeight: "bolder",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "max-content",
            marginTop: "10px",
            fontSize: "18px",
            "&:hover": { color: "#f86f03" },
            "&::after": {
              content: "''",
              width: "0%",
              height: "2px",
              backgroundColor: "red",
              display: "block",
              transition: "0.5s",
              fontWeight: "bold",
              fontSize: "1rem",
              color: "red",
            },
            "&:hover::after": { width: "100%" },
            [t.breakpoints.down(500)]: { fontSize: "15px" },
          };
        }),
        f = (0, l.Ay)(r.A)(() => ({ fontWeight: "bold", fontSize: "22px" })),
        j = (0, o.i7)(
          i ||
            (i = (0, s.A)([
              "\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(5px);\n  }\n",
            ]))
        );
      function A(e) {
        var t;
        let { elem: n } = e,
          i = (0, a.Zp)();
        return (0, u.jsx)(u.Fragment, {
          children: (0, u.jsxs)(d.A, {
            sx: {
              display: "flex",
              maxWidth: 600,
              minWidth: 400,
              my: 1,
              height: 150,
            },
            children: [
              (0, u.jsxs)(c.A, {
                sx: {
                  bgcolor: "#f57c00",
                  color: "#fff",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
                children: [
                  (0, u.jsx)(f, {
                    variant: "h3",
                    children: m()(
                      null === n || void 0 === n ? void 0 : n.date
                    ).format("DD"),
                  }),
                  (0, u.jsx)(f, {
                    variant: "h6",
                    component: "div",
                    children: m()(
                      null === n || void 0 === n ? void 0 : n.date
                    ).format("MMM"),
                  }),
                ],
              }),
              (0, u.jsxs)(c.A, {
                sx: { padding: "16px" },
                children: [
                  (0, u.jsx)(g, {
                    variant: "h6",
                    component: "div",
                    color: "#f57c00",
                    children:
                      ((s = null === n || void 0 === n ? void 0 : n.title),
                      s ? s.charAt(0).toUpperCase() + s.slice(1) : ""),
                  }),
                  (0, u.jsxs)(r.A, {
                    sx: { display: "inline-flex" },
                    paragraph: !0,
                    fontSize: 14,
                    children: [
                      null === (t = n.notice) || void 0 === t
                        ? void 0
                        : t.substring(0, 80),
                      "...",
                    ],
                  }),
                  (0, u.jsxs)(r.A, {
                    className: "navigate",
                    sx: {
                      display: "flex",
                      fontWeight: "bold",
                      alignItems: "center",
                      fontSize: "14px",
                      color: h.A.darkPalette.primary.main,
                      cursor: "pointer",
                    },
                    fontSize: 14,
                    onClick: () => {
                      i("/notice-details/".concat(n._id), {
                        state: { data: n },
                      });
                    },
                    children: [
                      "Read More",
                      " ",
                      (0, u.jsx)(p.A, {
                        fontSize: "small",
                        fontWeight: 600,
                        sx: {
                          transition: "transform 0.3s ease",
                          animation: "".concat(j, " 1s infinite"),
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
        var s;
      }
    },
  },
]);
//# sourceMappingURL=9581.b6e7af58.chunk.js.map
