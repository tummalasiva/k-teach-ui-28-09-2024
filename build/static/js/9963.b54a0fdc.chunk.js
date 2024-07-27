/** @format */

"use strict";
(self.webpackChunkschoolerp = self.webpackChunkschoolerp || []).push([
  [9963],
  {
    77068: (e, t, n) => {
      n.r(t), n.d(t, { default: () => wt });
      var i = n(65043),
        a = n(34535),
        s = n(26240),
        o = n(96446),
        l = n(94109),
        r = n(92314),
        d = n(55263),
        c = n(35721),
        h = n(55376),
        p = n(85865),
        x = n(39336),
        u = n(17392),
        m = n(89611),
        g = n(55896),
        A = n(91707),
        f = n(30681),
        j = n(38968),
        b = n(2050),
        y = n(48734),
        v = n(88911),
        w = n(77739),
        k = n(81045),
        S = n(70378),
        C = n(32143),
        M = n(30279),
        z = n(4598),
        D = n(35475),
        N = n(73216),
        I = n(75310),
        _ = n(99792),
        T = n(1702),
        R = n(52177),
        P = n(67485),
        W = n(70579);
      const F = {
        SIDE_MENU_DATA_STUDENT: [
          {
            name: "News",
            path: "/sch/student_news",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "Notice",
            path: "/sch/student_notice",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "Routine",
            path: "/sch/student_routine",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "My Receipts",
            path: "/sch/student_receipts",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "Attendance",
            path: "/sch/student_attendance",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "Assignment",
            path: "/sch/student_assignment",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "Feedback",
            path: "/sch/student_feedback",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "My Courses",
            path: "/sch/student_courses",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
          {
            name: "Live",
            path: "/sch/student_live",
            renderName: [],
            subMenus: [],
            icon: (0, W.jsx)(P.A, { color: "primary", fontSize: "small" }),
          },
        ],
      };
      var B = n(52101),
        O = n(58293),
        E = (n(3341), n(42111)),
        G = n(13059),
        H = n(87715),
        L = n(81728),
        q = n(12110),
        Y = n(98587),
        U = n(58168),
        V = n(58387),
        K = n(68606),
        J = n(72876),
        X = n(57056),
        Z = n(32400);
      function $(e) {
        return (0, Z.Ay)("MuiCardHeader", e);
      }
      const Q = (0, X.A)("MuiCardHeader", [
          "root",
          "avatar",
          "action",
          "content",
          "title",
          "subheader",
        ]),
        ee = [
          "action",
          "avatar",
          "className",
          "component",
          "disableTypography",
          "subheader",
          "subheaderTypographyProps",
          "title",
          "titleTypographyProps",
        ],
        te = (0, a.Ay)("div", {
          name: "MuiCardHeader",
          slot: "Root",
          overridesResolver: (e, t) =>
            (0, U.A)(
              {
                ["& .".concat(Q.title)]: t.title,
                ["& .".concat(Q.subheader)]: t.subheader,
              },
              t.root
            ),
        })({ display: "flex", alignItems: "center", padding: 16 }),
        ne = (0, a.Ay)("div", {
          name: "MuiCardHeader",
          slot: "Avatar",
          overridesResolver: (e, t) => t.avatar,
        })({ display: "flex", flex: "0 0 auto", marginRight: 16 }),
        ie = (0, a.Ay)("div", {
          name: "MuiCardHeader",
          slot: "Action",
          overridesResolver: (e, t) => t.action,
        })({
          flex: "0 0 auto",
          alignSelf: "flex-start",
          marginTop: -4,
          marginRight: -8,
          marginBottom: -4,
        }),
        ae = (0, a.Ay)("div", {
          name: "MuiCardHeader",
          slot: "Content",
          overridesResolver: (e, t) => t.content,
        })({ flex: "1 1 auto" }),
        se = i.forwardRef(function (e, t) {
          const n = (0, J.A)({ props: e, name: "MuiCardHeader" }),
            {
              action: i,
              avatar: a,
              className: s,
              component: o = "div",
              disableTypography: l = !1,
              subheader: r,
              subheaderTypographyProps: d,
              title: c,
              titleTypographyProps: h,
            } = n,
            x = (0, Y.A)(n, ee),
            u = (0, U.A)({}, n, { component: o, disableTypography: l }),
            m = ((e) => {
              const { classes: t } = e;
              return (0, K.A)(
                {
                  root: ["root"],
                  avatar: ["avatar"],
                  action: ["action"],
                  content: ["content"],
                  title: ["title"],
                  subheader: ["subheader"],
                },
                $,
                t
              );
            })(u);
          let g = c;
          null == g ||
            g.type === p.A ||
            l ||
            (g = (0, W.jsx)(
              p.A,
              (0, U.A)(
                {
                  variant: a ? "body2" : "h5",
                  className: m.title,
                  component: "span",
                  display: "block",
                },
                h,
                { children: g }
              )
            ));
          let A = r;
          return (
            null == A ||
              A.type === p.A ||
              l ||
              (A = (0, W.jsx)(
                p.A,
                (0, U.A)(
                  {
                    variant: a ? "body2" : "body1",
                    className: m.subheader,
                    color: "text.secondary",
                    component: "span",
                    display: "block",
                  },
                  d,
                  { children: A }
                )
              )),
            (0, W.jsxs)(
              te,
              (0, U.A)(
                {
                  className: (0, V.A)(m.root, s),
                  as: o,
                  ref: t,
                  ownerState: u,
                },
                x,
                {
                  children: [
                    a &&
                      (0, W.jsx)(ne, {
                        className: m.avatar,
                        ownerState: u,
                        children: a,
                      }),
                    (0, W.jsxs)(ae, {
                      className: m.content,
                      ownerState: u,
                      children: [g, A],
                    }),
                    i &&
                      (0, W.jsx)(ie, {
                        className: m.action,
                        ownerState: u,
                        children: i,
                      }),
                  ],
                }
              )
            )
          );
        });
      var oe = n(36591),
        le = n(26494),
        re = n(27600),
        de = n(64851),
        ce = n(21337),
        he = n(49545),
        pe = n(68903);
      const xe = (0, a.Ay)((e) => {
          const { expand: t, ...n } = e;
          return (0, W.jsx)(u.A, { ...n });
        })((e) => {
          let { theme: t, expand: n } = e;
          return {
            transform: n ? "rotate(180deg)" : "rotate(0deg)",
            marginLeft: "auto",
            transition: t.transitions.create("transform", {
              duration: t.transitions.duration.shortest,
            }),
          };
        }),
        ue = (0, a.Ay)(le.A)({
          flexGrow: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          maxHeight: "5.5em",
          textOverflow: "ellipsis",
        }),
        me = [
          {
            title: "Good Morning",
            date: "September 14, 2016",
            shortNews:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp, and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\xf3n, bay leaves, garlic, tomatoes, onion, salt, and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
            news: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp, and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\xf3n, bay leaves, garlic, tomatoes, onion, salt, and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat Heat oil in a (14- to ",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            shortNews:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
            news: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp, and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\xf3n, bay leaves, garlic, tomatoes, onion, salt, and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            shortNews:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
            news: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp, and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\xf3n, bay leaves, garlic, tomatoes, onion, salt, and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            shortNews:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
            news: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp, and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\xf3n, bay leaves, garlic, tomatoes, onion, salt, and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            shortNews:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
            news: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp, and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\xf3n, bay leaves, garlic, tomatoes, onion, salt, and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
          },
        ];
      function ge() {
        const [e, t] = i.useState(!1);
        return (0, W.jsx)(pe.Ay, {
          container: !0,
          spacing: 2,
          children: me.map((n, i) =>
            (0, W.jsx)(
              pe.Ay,
              {
                item: !0,
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
                children: (0, W.jsxs)(q.A, {
                  sx: { maxWidth: 345 },
                  children: [
                    (0, W.jsx)(se, {
                      avatar: (0, W.jsx)(k.A, {
                        sx: { bgcolor: de.A[500] },
                        "aria-label": "recipe",
                        children: "R",
                      }),
                      title: n.title,
                      subheader: n.date,
                    }),
                    (0, W.jsx)(oe.A, {
                      component: "img",
                      height: "194",
                      image: he,
                      alt: "Paella dish",
                    }),
                    (0, W.jsx)(ue, {
                      children: (0, W.jsx)(p.A, {
                        variant: "body2",
                        color: "text.secondary",
                        children: n.shortNews,
                      }),
                    }),
                    (0, W.jsx)(re.A, {
                      disableSpacing: !0,
                      children: (0, W.jsx)(xe, {
                        expand: e[i],
                        onClick: () =>
                          ((e) => {
                            t((t) => ({ ...t, [e]: !t[e] }));
                          })(i),
                        "aria-expanded": e[i],
                        "aria-label": "show more",
                        children: (0, W.jsx)(ce.A, {}),
                      }),
                    }),
                    (0, W.jsx)(M.A, {
                      in: e[i],
                      timeout: "auto",
                      unmountOnExit: !0,
                      children: (0, W.jsx)(le.A, {
                        children: (0, W.jsx)(p.A, {
                          paragraph: !0,
                          children: n.news,
                        }),
                      }),
                    }),
                  ],
                }),
              },
              i
            )
          ),
        });
      }
      const Ae = (0, a.Ay)((e) => {
          const { expand: t, ...n } = e;
          return (0, W.jsx)(u.A, { ...n });
        })((e) => {
          let { theme: t, expand: n } = e;
          return {
            transform: n ? "rotate(180deg)" : "rotate(0deg)",
            marginLeft: "auto",
            transition: t.transitions.create("transform", {
              duration: t.transitions.duration.shortest,
            }),
          };
        }),
        fe = [
          {
            title: "Good Morning",
            date: "September 14, 2016",
            notice:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            notice:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup ",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            notice:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            notice:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
          },
          {
            title: "Good Morning",
            date: "September 14, 2016",
            notice:
              "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
          },
        ],
        je = (0, a.Ay)(q.A)({
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }),
        be = (0, a.Ay)(le.A)({
          flexGrow: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          maxHeight: "5.5em",
          textOverflow: "ellipsis",
        }),
        ye = (0, a.Ay)(le.A)({ overflowY: "auto" });
      function ve() {
        const [e, t] = i.useState({});
        return (0, W.jsx)(pe.Ay, {
          container: !0,
          spacing: 2,
          children: fe.map((n, i) =>
            (0, W.jsx)(
              pe.Ay,
              {
                item: !0,
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
                children: (0, W.jsxs)(je, {
                  children: [
                    (0, W.jsx)(se, {
                      avatar: (0, W.jsx)(k.A, {
                        sx: { bgcolor: de.A[500] },
                        "aria-label": "recipe",
                        children: "R",
                      }),
                      title: n.title,
                      subheader: n.date,
                    }),
                    (0, W.jsx)(be, {
                      children: (0, W.jsx)(p.A, {
                        variant: "body2",
                        color: "text.secondary",
                        children: n.notice,
                      }),
                    }),
                    (0, W.jsx)(re.A, {
                      disableSpacing: !0,
                      children: (0, W.jsx)(Ae, {
                        expand: e[i],
                        onClick: () =>
                          ((e) => {
                            t((t) => ({ ...t, [e]: !t[e] }));
                          })(i),
                        "aria-expanded": e[i],
                        "aria-label": "show more",
                        children: (0, W.jsx)(ce.A, {}),
                      }),
                    }),
                    (0, W.jsx)(M.A, {
                      in: e[i],
                      timeout: "auto",
                      unmountOnExit: !0,
                      children: (0, W.jsx)(ye, {
                        children: (0, W.jsx)(p.A, {
                          paragraph: !0,
                          children: n.notice,
                        }),
                      }),
                    }),
                  ],
                }),
              },
              i
            )
          ),
        });
      }
      var we = n(20486);
      const ke = [
        { name: "Total AmountPaid Paid", key: "totalAmountPaid" },
        { name: "Date", key: "date", isDate: !0 },
      ];
      var Se = n(29541);
      function Ce() {
        const [e, t] = (0, i.useState)([]);
        return (0, W.jsx)(W.Fragment, {
          children: (0, W.jsx)(we.A, {
            actions: ["download"],
            tableKeys: ke,
            bodyDataModal: "invoice",
            bodyData: e,
          }),
        });
      }
      var Me = n(39652),
        ze = n(79650),
        De = n(63336),
        Ne = n(71806),
        Ie = n(84882),
        _e = n(28076),
        Te = n(73460);
      const Re = (0, a.Ay)(Me.A)((e) => {
        let { theme: t } = e;
        return { border: "1px solid #e0e0e0", color: "black", padding: "10px" };
      });
      function Pe() {
        const [e, t] = (0, i.useState)([]),
          { selectedSetting: n } = (0, i.useContext)(L.A);
        return (0, W.jsx)(ze.A, {
          component: De.A,
          sx: { marginTop: "15px" },
          children: (0, W.jsxs)(Ne.A, {
            sx: { minWidth: 650 },
            "aria-label": "routine table",
            children: [
              (0, W.jsx)(Ie.A, {
                children: (0, W.jsxs)(_e.A, {
                  children: [
                    (0, W.jsx)(Re, { align: "center", children: "Day" }),
                    (0, W.jsx)(Re, { align: "center", children: "Routine" }),
                  ],
                }),
              }),
              (0, W.jsx)(Te.A, {
                children: (0, W.jsxs)(_e.A, {
                  children: [
                    (0, W.jsx)(Re, { align: "center", children: "Monday" }),
                    (0, W.jsx)(Re, {
                      align: "center",
                      children: (0, W.jsx)(o.A, {
                        component: "span",
                        sx: { p: 1.5, border: "1px solid grey" },
                        children: "12:00-12:20",
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        });
      }
      const We = [
        { name: "Meeting Type", key: "type" },
        { name: "Meeting Date", key: "date" },
        { name: "Status", key: "status" },
      ];
      var Fe = n(28242),
        Be = n(53193),
        Oe = n(72221);
      const Ee = (0, a.Ay)("label")(() => ({
          fontWeight: 650,
          fontSize: "15px",
          color: "#424242",
          paddingLeft: "10px",
        })),
        Ge = (0, a.Ay)(o.A)(() => ({
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
          marginBottom: 1,
        }));
      function He() {
        const { selectedSetting: e } = (0, i.useContext)(L.A),
          [t, n] = (0, i.useState)([]),
          [a, s] = (0, i.useState)("All");
        return (
          (0, i.useEffect)(() => {
            (async (t) => {
              try {
                const { data: t } = await (0, H.Jt)(G.r.meeting.listStudent, {
                  params: { schoolId: e._id },
                });
                n(null === t || void 0 === t ? void 0 : t.result),
                  console.log(t.result, "44444444444");
              } catch (i) {
                console.log(i);
              }
            })();
          }, [e]),
          (0, W.jsxs)(W.Fragment, {
            children: [
              (0, W.jsx)(Ge, {
                children: (0, W.jsxs)(Be.A, {
                  size: "small",
                  sx: { m: 1, minWidth: 250 },
                  children: [
                    (0, W.jsxs)(Ee, {
                      id: "demo-simple-select-label",
                      children: [
                        (0, W.jsx)(Fe.A, { fontSize: "small" }),
                        " Filter Meeting",
                      ],
                    }),
                    (0, W.jsxs)(Oe.A, {
                      labelId: "demo-simple-select-label",
                      id: "demo-simple-select",
                      placeholder: "Select Course",
                      value: a,
                      children: [
                        (0, W.jsx)(C.A, { value: "All", children: " All " }),
                        (0, W.jsx)(C.A, {
                          value: "OneONoneCall",
                          children: "One-On-One Call ",
                        }),
                        (0, W.jsx)(C.A, {
                          value: "GroupCall",
                          children: "Group Call ",
                        }),
                        (0, W.jsx)(C.A, {
                          value: "LiveStreaming",
                          children: "Live Streaming",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, W.jsx)(we.A, {
                actions: [],
                tableKeys: We,
                bodyDataModal: "live session",
                bodyData: t,
              }),
            ],
          })
        );
      }
      var Le = n(19252),
        qe = n(2828),
        Ye = n(42518),
        Ue = n(91722);
      const Ve = (0, a.Ay)(p.A)((e) => {
          let { theme: t } = e;
          return {
            textTransform: "uppercase",
            fontSize: "1rem",
            fontWeight: "bold",
            marginTop: "2%",
            color: t.palette.primary.main,
            display: "-webkit-box",
            margin: "2px 0",
            WebkitLineClamp: 1,
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
          };
        }),
        Ke = (0, a.Ay)(o.A)(() => ({ fontWeight: 550, fontSize: "13px" })),
        Je = (0, a.Ay)(o.A)(() => ({
          position: "absolute",
          top: "2%",
          right: "5%",
          backgroundColor: "white",
          border: "1px solid white",
          borderRadius: "2px",
          display: "flex",
          fontSize: "13px",
          gap: "5px",
          alignItems: "center",
        })),
        Xe = (0, a.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return {
            width: "100%",
            [t.breakpoints.up("md")]: { width: "40%" },
            margin: "150px auto",
            textAlign: "center",
            color: "gray",
            border: "2px solid gray",
            padding: "30px",
          };
        });
      function Ze() {
        const { selectedSetting: e } = (0, i.useContext)(L.A),
          t = (0, N.Zp)(),
          [n, a] = (0, i.useState)();
        return (
          (0, i.useEffect)(() => {
            (async () => {
              try {
                const { data: t } = await (0, H.Jt)(G.r.course.list, {
                  params: { schoolId: e._id },
                });
                a(t.result);
              } catch (t) {
                console.error(t);
              }
            })();
          }, []),
          (0, W.jsx)(W.Fragment, {
            children: (0, W.jsx)(Le.A, {
              maxWidth: "xl",
              sx: { marginTop: "5px" },
              children:
                n && n.length > 0
                  ? (0, W.jsx)(pe.Ay, {
                      container: !0,
                      spacing: 2,
                      children: n.map((e, n) =>
                        (0, W.jsx)(
                          pe.Ay,
                          {
                            item: !0,
                            xs: 12,
                            sm: 6,
                            md: 4,
                            children: (0, W.jsx)(q.A, {
                              sx: {
                                boxShadow: "10",
                                height: "100%",
                                borderRadius: "5px",
                              },
                              children: (0, W.jsxs)(qe.A, {
                                onClick: () => (e._id, void t("/")),
                                children: [
                                  (0, W.jsx)(oe.A, {
                                    component: "img",
                                    style: { height: "180px" },
                                    image:
                                      null !== e &&
                                      void 0 !== e &&
                                      e.thumbnailImage
                                        ? null === e || void 0 === e
                                          ? void 0
                                          : e.thumbnailImage
                                        : "",
                                    alt: "green iguana",
                                  }),
                                  (0, W.jsxs)(le.A, {
                                    sx: { padding: "10px 10px" },
                                    children: [
                                      (0, W.jsxs)(Je, {
                                        children: [
                                          (0, W.jsx)(Ue.A, {
                                            sx: { fontSize: "medium" },
                                          }),
                                          (0, W.jsxs)(p.A, {
                                            variant: "body1",
                                            component: "div",
                                            textAlign: "center",
                                            children: [
                                              null !== e &&
                                              void 0 !== e &&
                                              e.courseHours
                                                ? null === e || void 0 === e
                                                  ? void 0
                                                  : e.courseHours
                                                : "0 hrs",
                                              "hrs",
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, W.jsx)(Ve, {
                                        variant: "h6",
                                        children: e.title,
                                      }),
                                      (0, W.jsx)(Ke, {
                                        children: e.description,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          },
                          e._id
                        )
                      ),
                    })
                  : (0, W.jsx)(pe.Ay, {
                      container: !0,
                      spacing: 2,
                      children: (0, W.jsxs)(Xe, {
                        children: [
                          (0, W.jsx)(p.A, {
                            variant: "h6",
                            children:
                              "You don't have any COURSE in your account!",
                          }),
                          (0, W.jsx)(Ye.A, {
                            onClick: () => t("/allcourse"),
                            variant: "contained",
                            size: "small",
                            sx: { marginTop: "30px" },
                            children: "Explore",
                          }),
                        ],
                      }),
                    }),
            }),
          })
        );
      }
      var $e = n(69652),
        Qe = n(63516),
        et = n(83094);
      function tt() {
        const { selectedSetting: e } = (0, i.useContext)(L.A),
          [t, n] = (0, i.useState)([]);
        (0, i.useEffect)(() => {
          (async () => {
            try {
              const { data: t } = await (0, H.Jt)(G.r.subject.list, {
                params: { schoolId: e._id },
              });
              n(t.result.map((e) => ({ ...e, label: e.name, value: e._id })));
            } catch (t) {
              console.log(t);
            }
          })();
        }, [e]);
        const a = (0, Qe.Wx)({
          initialValues: { subjet: "", fromDate: null, toDate: null },
        });
        return (0, W.jsxs)(W.Fragment, {
          children: [
            " ",
            (0, W.jsxs)(pe.Ay, {
              container: !0,
              spacing: 2,
              children: [
                (0, W.jsx)(pe.Ay, {
                  xs: 12,
                  md: 6,
                  lg: 3,
                  item: !0,
                  children: (0, W.jsx)($e.A, {
                    required: !0,
                    name: "subject",
                    formik: a,
                    label: "Select Subject",
                    options: t,
                  }),
                }),
                (0, W.jsx)(pe.Ay, {
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 3,
                  item: !0,
                  children: (0, W.jsx)(et.A, {
                    formik: a,
                    label: "From Date",
                    name: "fromDate",
                  }),
                }),
                (0, W.jsx)(pe.Ay, {
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 3,
                  item: !0,
                  children: (0, W.jsx)(et.A, {
                    formik: a,
                    label: "To Date",
                    name: "toDate",
                  }),
                }),
                (0, W.jsx)(pe.Ay, {
                  xs: 12,
                  md: 6,
                  lg: 3,
                  sx: { alignSelf: "center" },
                  item: !0,
                  children: (0, W.jsx)(Ye.A, {
                    size: "small",
                    variant: "contained",
                    children: "Find",
                  }),
                }),
              ],
            }),
          ],
        });
      }
      const nt = [
        { name: "Subject", key: "subject" },
        { name: "Title", key: "title" },
        { name: "Due Date", key: "dueDate", isDate: !0 },
      ];
      function it() {
        const [e, t] = (0, i.useState)([]);
        return (0, W.jsx)(W.Fragment, {
          children: (0, W.jsx)(we.A, {
            actions: ["download"],
            tableKeys: nt,
            bodyDataModal: "assignment",
            bodyData: e,
          }),
        });
      }
      var at = n(24490),
        st = (n(66097), n(61327), n(94992)),
        ot = n(60446),
        lt = n.n(ot);
      const rt = () => {
          const [e, t] = (0, i.useState)([]);
          return (0, W.jsxs)(W.Fragment, {
            children: [
              (0, W.jsxs)(o.A, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px 0px",
                  gap: 5,
                },
                children: [
                  (0, W.jsxs)(o.A, {
                    className: "colorBotton",
                    children: [
                      (0, W.jsx)(st.A, {
                        sx: { fontSize: 15, color: "green" },
                      }),
                      (0, W.jsx)(p.A, { children: "Present" }),
                    ],
                  }),
                  (0, W.jsxs)(o.A, {
                    className: "colorBotton",
                    children: [
                      (0, W.jsx)(st.A, { sx: { fontSize: 15, color: "red" } }),
                      (0, W.jsx)(p.A, { children: "Absent" }),
                    ],
                  }),
                ],
              }),
              (0, W.jsx)(at.Ay, {
                tileContent: (t) => {
                  let { date: n } = t;
                  const i = lt()(new Date(n)).get("date"),
                    a = lt()(new Date(n)).get("month") + 1,
                    s = lt()(new Date(n)).get("year"),
                    o = e.find(
                      (e) =>
                        lt()(new Date(e.date)).get("date") === i &&
                        lt()(new Date(e.date)).get("month") + 1 === a &&
                        lt()(new Date(e.date)).get("year") === s
                    );
                  return (
                    console.log(o, "tilecontentS"),
                    o
                      ? ((t) => {
                          let { date: n } = t;
                          const i = lt()(new Date(n)).get("date"),
                            a = lt()(new Date(n)).get("month") + 1,
                            s = lt()(new Date(n)).get("year"),
                            o = e.find(
                              (e) =>
                                lt()(new Date(e.date)).get("date") === i &&
                                lt()(new Date(e.date)).get("month") + 1 === a &&
                                lt()(new Date(e.date)).get("year") === s
                            );
                          let l = "";
                          return (
                            !0 === o.attendanceDetails.attendanceStatus
                              ? (l = "present")
                              : !1 === o.attendanceDetails.attendanceStatus &&
                                (l = "absent"),
                            (0, W.jsx)("div", { className: "cell ".concat(l) })
                          );
                        })({ date: n })
                      : null
                  );
                },
                tileClassName: (e) => {
                  let { date: t } = e;
                  const n = new Date(),
                    i = 6 === t.getDay();
                  return t.toDateString() === n.toDateString()
                    ? "blue-day"
                    : i
                    ? "saturday-date"
                    : "";
                },
              }),
            ],
          });
        },
        dt = [
          { name: "Amount Paid", key: "amountPaid" },
          { name: "Payment Mode", key: "paymentMode" },
          { name: "Paid On", key: "paidOn", isDate: !0 },
        ];
      function ct() {
        const [e, t] = (0, i.useState)([]);
        return (0, W.jsx)(W.Fragment, {
          children: (0, W.jsx)(we.A, {
            actions: ["download"],
            tableKeys: dt,
            bodyDataModal: "receipts",
            bodyData: e,
          }),
        });
      }
      n(4599), n(15737), n(95482), n(95855);
      (0, a.Ay)(o.A)((e) => {
        let { theme: t } = e;
        return {
          border: "1px solid",
          borderColor: "lightgray",
          marginBottom: "20px",
          borderRadius: t.shape.borderRadius,
          overflow: "hidden",
        };
      }),
        (0, a.Ay)(p.A)((e) => {
          let { theme: t } = e;
          return {
            textAlign: "start",
            fontSize: "14px",
            padding: "5px 10px",
            borderBottom: "1px solid",
            borderBottomColor: "lightgray",
            fontWeight: "bold",
            color: "white",
            background: t.palette.secondary.main,
          };
        }),
        (0, a.Ay)(o.A)((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            justifyContent: "flex-end",
            gap: t.spacing(2),
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            background: "whitesmoke",
            padding: t.spacing(2),
            zIndex: 1e3,
          };
        });
      var ht = n(77502);
      n(73213);
      const pt = (0, a.Ay)(_e.A)((e) => {
          let { theme: t } = e;
          return { "&:nth-of-type(odd)": { backgroundColor: "#44628561" } };
        }),
        xt = (0, a.Ay)(Me.A)((e) => {
          let { theme: t } = e;
          return {
            width: 200,
            padding: "13px 5px",
            border: "1px solid gray",
            ["&.".concat(ht.A.head)]: {
              backgroundColor: t.palette.common.black,
              color: t.palette.common.white,
            },
            ["&.".concat(ht.A.body)]: { fontSize: 15 },
          };
        });
      function ut(e) {
        var t, n, i, a, s, o, l, r, d, c, h;
        let { student: p } = e;
        return (0, W.jsxs)(W.Fragment, {
          children: [
            null !== p && void 0 !== p && p.photo
              ? (0, W.jsx)("img", {
                  src: p.photo,
                  height: 75,
                  width: 75,
                  style: { borderRadius: "50%", alignSelf: "center" },
                  alt: "student Photo",
                })
              : (0, W.jsx)(k.A, {
                  sx: { height: 75, width: 75 },
                  src: "/broken-image.jpg",
                }),
            (0, W.jsx)(Ne.A, {
              "aria-label": "customized table",
              sx: {
                width: 660,
                my: 2,
                display: { xs: "none", sm: "block", md: "block", lg: "block" },
                borderRadius: "5px",
              },
              children: (0, W.jsxs)(Te.A, {
                children: [
                  (0, W.jsxs)(pt, {
                    children: [
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Name",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (t = p.basicInfo) ||
                          void 0 === t
                            ? void 0
                            : t.name) || "NA",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Admission Number",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (n = p.academicInfo) ||
                          void 0 === n
                            ? void 0
                            : n.admissionNumber) || "NA",
                      }),
                    ],
                  }),
                  (0, W.jsxs)(pt, {
                    children: [
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Admission Date",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (i = p.basicInfo) ||
                          void 0 === i
                            ? void 0
                            : i.admissionDate) || "NA",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Phone",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p || void 0 === p
                            ? void 0
                            : p.contactNumber) || "NA",
                      }),
                    ],
                  }),
                  (0, W.jsxs)(pt, {
                    children: [
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Present Address",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (a = p.basicInfo) ||
                          void 0 === a
                            ? void 0
                            : a.presentAddress) || "NA",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Permanent Address",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (s = p.basicInfo) ||
                          void 0 === s
                            ? void 0
                            : s.permanentAddress) || "NA",
                      }),
                    ],
                  }),
                  (0, W.jsxs)(pt, {
                    children: [
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Gender",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (o = p.basicInfo) ||
                          void 0 === o
                            ? void 0
                            : o.gender) || "NA",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Blood Group",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (l = p.basicInfo) ||
                          void 0 === l ||
                          null === (r = l.bloodGroup) ||
                          void 0 === r
                            ? void 0
                            : r.toUpperCase()) || "NA",
                      }),
                    ],
                  }),
                  (0, W.jsxs)(pt, {
                    children: [
                      (0, W.jsxs)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: ["Religion", " "],
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (d = p.basicInfo) ||
                          void 0 === d
                            ? void 0
                            : d.religion) || "NA",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Birth Date",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children: lt()(
                          (null === p ||
                          void 0 === p ||
                          null === (c = p.basicInfo) ||
                          void 0 === c
                            ? void 0
                            : c.dob) || "NA"
                        ).format("DD-MM-YYYY"),
                      }),
                    ],
                  }),
                  (0, W.jsxs)(pt, {
                    children: [
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Email",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        children:
                          (null === p ||
                          void 0 === p ||
                          null === (h = p.academicInfo) ||
                          void 0 === h
                            ? void 0
                            : h.email) || "NA",
                      }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Class",
                      }),
                      (0, W.jsx)(xt, { align: "left", children: "NA" }),
                    ],
                  }),
                  (0, W.jsxs)(pt, {
                    children: [
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Section",
                      }),
                      (0, W.jsx)(xt, { align: "left", children: "NA" }),
                      (0, W.jsx)(xt, {
                        align: "left",
                        sx: { fontWeight: "bold" },
                        children: "Roll No.",
                      }),
                      (0, W.jsx)(xt, { align: "left", children: "NA" }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      }
      function mt() {
        const { selectedSetting: e } = (0, i.useContext)(L.A),
          [t, n] = (0, i.useState)(0),
          [a, s] = (0, i.useState)(!1),
          [l, r] = (0, i.useState)(null);
        return (0, W.jsxs)(W.Fragment, {
          children: [
            (0, W.jsx)(Se.A, { title: "Profile" }),
            (0, W.jsx)(o.A, {
              sx: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              },
              children: (0, W.jsx)(ut, { student: l }),
            }),
          ],
        });
      }
      const gt = 270,
        At = (e) => ({
          width: gt,
          transition: e.transitions.create("width", {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
        }),
        ft = (e) => ({
          transition: e.transitions.create("width", {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.leavingScreen,
          }),
          overflowX: "hidden",
          width: "calc(".concat(e.spacing(7), " + 1px)"),
          [e.breakpoints.up("sm")]: {
            width: "calc(".concat(e.spacing(8), " + 1px)"),
          },
        }),
        jt = (0, a.Ay)("div")((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: t.spacing(0, 1),
            ...t.mixins.toolbar,
          };
        }),
        bt = (0, a.Ay)("div")((e) => {
          let { theme: t } = e;
          return {
            display: "flex",
            alignItems: "center",
            padding: t.spacing(0, 1),
            ...t.mixins.toolbar,
            justifyContent: "flex-start",
          };
        }),
        yt = (0, a.Ay)(r.A, { shouldForwardProp: (e) => "open" !== e })((e) => {
          let { theme: t, open: n } = e;
          return {
            zIndex: t.zIndex.drawer + 1,
            transition: t.transitions.create(["width", "margin"], {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.leavingScreen,
            }),
            ...(n && {
              marginLeft: gt,
              width: "calc(100% - ".concat(gt, "px)"),
              transition: t.transitions.create(["width", "margin"], {
                easing: t.transitions.easing.sharp,
                duration: t.transitions.duration.enteringScreen,
              }),
            }),
          };
        }),
        vt = (0, a.Ay)(l.Ay, { shouldForwardProp: (e) => "open" !== e })(
          (e) => {
            let { theme: t, open: n } = e;
            return {
              width: gt,
              flexShrink: 0,
              whiteSpace: "nowrap",
              boxSizing: "border-box",
              ...(n && { ...At(t), "& .MuiDrawer-paper": At(t) }),
              ...(!n && { ...ft(t), "& .MuiDrawer-paper": ft(t) }),
            };
          }
        );
      function wt() {
        const e = (0, s.A)(),
          { selectedSetting: t } = i.useContext(L.A),
          [n, a] = i.useState(!0),
          [l, r] = i.useState([]),
          P = (0, N.Zp)(),
          [q, Y] = i.useState(null),
          U = Boolean(q),
          [V, K] = i.useState([]),
          J = () => {
            Y(null);
          },
          { isDarkMode: X, setIsDarkMode: Z } = i.useContext(E.A),
          [$, Q] = i.useState(""),
          [ee, te] = i.useState(null),
          { SIDE_MENU_DATA_STUDENT: ne } = F;
        i.useEffect(() => {
          r(ne), ie();
        }, []);
        const ie = async () => {
          try {
            const { data: e } = await (0, H.Jt)(G.r.academicYear.list);
            K(e.result[0]);
          } catch (e) {
            console.log(e);
          }
        };
        i.useEffect(() => {
          (() => {
            let e = window.location.pathname,
              t = null;
            for (let n of ne)
              if (n.subMenus.length) {
                n.subMenus.map((e) => e.path).includes(e) &&
                  (t = ne.indexOf(n));
              }
            t && (te(t), a(!0));
          })();
        }, []);
        return (0, W.jsxs)(o.A, {
          sx: { display: "flex" },
          children: [
            (0, W.jsx)(h.Ay, {}),
            (0, W.jsx)(yt, {
              position: "fixed",
              open: n,
              children: (0, W.jsxs)(d.A, {
                children: [
                  (0, W.jsx)(u.A, {
                    color: "inherit",
                    "aria-label": "open drawer",
                    onClick: () => {
                      a(!0);
                    },
                    edge: "start",
                    sx: { marginRight: 5, ...(n && { display: "none" }) },
                    children: (0, W.jsx)(m.A, {}),
                  }),
                  (0, W.jsxs)(p.A, {
                    variant: "h6",
                    component: "div",
                    color: "white",
                    textAlign: "center",
                    fontSize: "18px",
                    sx: { display: { xs: "none", md: "block" } },
                    children: [
                      t.name,
                      " [",
                      V ? V.from : "-",
                      " -",
                      " ",
                      V ? V.to : "-",
                      "]",
                    ],
                  }),
                  (0, W.jsx)(o.A, {
                    sx: {
                      display: "flex",
                      width: "100%",
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                    },
                    children: (0, W.jsxs)(v.A, {
                      sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      spacing: 1,
                      direction: "row",
                      children: [
                        (0, W.jsx)(w.A, {
                          title: "Notification",
                          children: (0, W.jsx)(D.N_, {
                            to: "/sch/notifications",
                            children: (0, W.jsx)(u.A, {
                              children: (0, W.jsx)(I.A, {
                                sx: { color: "#BDBDBD", width: 26, height: 26 },
                              }),
                            }),
                          }),
                        }),
                        (0, W.jsx)(w.A, {
                          title: "Account Settings",
                          children: (0, W.jsx)(u.A, {
                            onClick: (e) => {
                              Y(e.currentTarget);
                            },
                            "aria-controls": U ? "account-menu" : void 0,
                            "aria-haspopup": "true",
                            "aria-expanded": U ? "true" : void 0,
                            children: (0, W.jsx)(k.A, {
                              sx: { width: 26, height: 26 },
                            }),
                          }),
                        }),
                        (0, W.jsx)(w.A, {
                          title: "websites",
                          children: (0, W.jsx)(D.N_, {
                            to: "/",
                            children: (0, W.jsx)(u.A, {
                              children: (0, W.jsx)(k.A, {
                                src: "/world-wide-web.png",
                                alt: "loading...",
                                sx: { width: 26, height: 26 },
                              }),
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            (0, W.jsxs)(S.A, {
              anchorEl: q,
              id: "account-menu",
              open: U,
              onClose: J,
              onClick: J,
              MenuListProps: { "aria-labelledby": "basic-button" },
              PaperProps: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
              transformOrigin: { horizontal: "right", vertical: "top" },
              anchorOrigin: { horizontal: "right", vertical: "bottom" },
              children: [
                (0, W.jsx)(C.A, {
                  onClick: J,
                  children: (0, W.jsxs)(D.N_, {
                    to: "/sch/student_profile",
                    style: { display: "flex", textDecoration: "none" },
                    children: [
                      (0, W.jsx)(b.A, {
                        children: (0, W.jsx)(R.A, { fontSize: "small" }),
                      }),
                      (0, W.jsx)(y.A, {
                        style: { color: "black" },
                        children: "Profile",
                      }),
                    ],
                  }),
                }),
                (0, W.jsx)(C.A, {
                  onClick: J,
                  children: (0, W.jsxs)(D.N_, {
                    to: "/sch/administrator/reset-password",
                    style: { display: "flex", textDecoration: "none" },
                    children: [
                      (0, W.jsx)(b.A, {
                        children: (0, W.jsx)(_.A, { fontSize: "small" }),
                      }),
                      (0, W.jsx)(y.A, {
                        style: { color: "black" },
                        children: "Reset Password",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, W.jsxs)(vt, {
              variant: "permanent",
              open: n,
              children: [
                (0, W.jsxs)(jt, {
                  sx: {
                    justifyContent: "space-between",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: X ? "#000" : "#fff",
                    overflow: "hidden",
                  },
                  children: [
                    (0, W.jsx)(o.A, {}),
                    (0, W.jsx)("img", {
                      style: {
                        height: "50px",
                        width: "80px",
                        objectFit: "contain",
                      },
                      src: null === t || void 0 === t ? void 0 : t.logo,
                    }),
                    (0, W.jsx)(u.A, {
                      onClick: () => {
                        a(!1);
                      },
                      children:
                        "rtl" === e.direction
                          ? (0, W.jsx)(A.A, { color: "primary" })
                          : (0, W.jsx)(g.A, { color: "primary" }),
                    }),
                  ],
                }),
                (0, W.jsx)(x.A, {}),
                (0, W.jsx)(c.A, {
                  children: l.map((e, t) =>
                    e.subMenus.length
                      ? (0, W.jsxs)(
                          "div",
                          {
                            children: [
                              (0, W.jsx)(
                                f.Ay,
                                {
                                  sx: { padding: 0 },
                                  children: (0, W.jsxs)(j.A, {
                                    selected:
                                      ee === t ||
                                      window.location.pathname === e.path,
                                    onClick: () =>
                                      ((e) => {
                                        if (ee === e) return te(null);
                                        te(e);
                                      })(t),
                                    children: [
                                      (0, W.jsx)(b.A, { children: e.icon }),
                                      (0, W.jsx)(y.A, { primary: e.name }),
                                      ee === t
                                        ? (0, W.jsx)(B.A, {})
                                        : (0, W.jsx)(O.A, {}),
                                    ],
                                  }),
                                },
                                e.path
                              ),
                              (0, W.jsx)(M.A, {
                                timeout: "auto",
                                unmountOnExit: !0,
                                in: ee === t,
                                sx: { width: "100%" },
                                children: (0, W.jsx)(c.A, {
                                  children: e.subMenus.map((e) =>
                                    (0, W.jsx)(
                                      f.Ay,
                                      {
                                        sx: { width: "100%" },
                                        children: (0, W.jsx)(D.N_, {
                                          to: e.path,
                                          style: {
                                            textDecoration: "none",
                                            display: "flex",
                                            flex: 1,
                                          },
                                          children: (0, W.jsxs)(j.A, {
                                            onClick: () => Q(e.path),
                                            selected:
                                              $ === e.path ||
                                              window.location.pathname ===
                                                e.path,
                                            children: [
                                              (0, W.jsx)(b.A, {
                                                children: e.icon,
                                              }),
                                              (0, W.jsx)(y.A, {
                                                primary: e.name,
                                              }),
                                            ],
                                          }),
                                        }),
                                      },
                                      e.name
                                    )
                                  ),
                                }),
                              }),
                            ],
                          },
                          e.path + e.name
                        )
                      : (0, W.jsx)(
                          "div",
                          {
                            children: (0, W.jsx)(f.Ay, {
                              disablePadding: !0,
                              children: (0, W.jsx)(D.N_, {
                                to: e.path,
                                style: {
                                  textDecoration: "none",
                                  display: "flex",
                                  flex: 1,
                                },
                                children: (0, W.jsxs)(j.A, {
                                  onClick: () => te(t),
                                  selected:
                                    ee === t ||
                                    window.location.pathname === e.path,
                                  children: [
                                    (0, W.jsx)(b.A, { children: e.icon }),
                                    (0, W.jsx)(y.A, { primary: e.name }),
                                  ],
                                }),
                              }),
                            }),
                          },
                          e.path
                        )
                  ),
                }),
                (0, W.jsx)(x.A, {}),
                (0, W.jsx)(f.Ay, {
                  disablePadding: !0,
                  children: (0, W.jsxs)(j.A, {
                    sx: { paddingLeft: 0 },
                    children: [
                      (0, W.jsx)(z.A, {
                        sx: { marginRight: "15px" },
                        checked: X,
                        onChange: () => {
                          Z(!X), window.localStorage.setItem("isDarkMode", !X);
                        },
                      }),
                      (0, W.jsx)(y.A, {
                        primary: X ? "Dark Mode" : "Light Mode",
                      }),
                    ],
                  }),
                }),
                (0, W.jsx)(x.A, { sx: { marginBottom: "20px" } }),
                (0, W.jsx)(bt, {
                  children: (0, W.jsx)(c.A, {
                    sx: { width: "100%" },
                    children: (0, W.jsx)(f.Ay, {
                      disablePadding: !0,
                      children: (0, W.jsxs)(j.A, {
                        onClick: () => {
                          window.localStorage.removeItem(
                            process.env.REACT_APP_ACCESS_TOKEN
                          ),
                            window.localStorage.removeItem(
                              process.env.REACT_APP_CURRENT_USER
                            ),
                            window.localStorage.removeItem("refresh_token"),
                            window.localStorage.removeItem(
                              process.env.REACT_APP_USER_TYPE
                            ),
                            P("/");
                        },
                        children: [
                          (0, W.jsx)(b.A, {
                            children: (0, W.jsx)(T.A, {
                              fontSize: "small",
                              color: "primary",
                            }),
                          }),
                          (0, W.jsx)(y.A, { primary: "Logout" }),
                        ],
                      }),
                    }),
                  }),
                }),
              ],
            }),
            (0, W.jsxs)(o.A, {
              component: "main",
              sx: { flexGrow: 1, p: 3, overflowX: "hidden", overflowY: "auto" },
              children: [
                (0, W.jsx)(jt, {}),
                (0, W.jsxs)(N.BV, {
                  children: [
                    (0, W.jsx)(N.qh, {
                      path: "student_news",
                      element: (0, W.jsx)(ge, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_notice",
                      element: (0, W.jsx)(ve, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_routine",
                      element: (0, W.jsx)(Pe, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_invoice",
                      element: (0, W.jsx)(Ce, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_receipts",
                      element: (0, W.jsx)(ct, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_attendance",
                      element: (0, W.jsx)(rt, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_assignment",
                      element: (0, W.jsx)(it, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_feedback",
                      element: (0, W.jsx)(tt, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_courses",
                      element: (0, W.jsx)(Ze, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_live",
                      element: (0, W.jsx)(He, {}),
                    }),
                    (0, W.jsx)(N.qh, {
                      path: "student_profile",
                      element: (0, W.jsx)(mt, {}),
                    }),
                  ],
                }),
                (0, W.jsx)(N.sv, {}),
              ],
            }),
          ],
        });
      }
    },
    29541: (e, t, n) => {
      n.d(t, { A: () => g });
      var i = n(96446),
        a = n(65043),
        s = n(34535),
        o = n(85865),
        l = n(88911),
        r = n(53193),
        d = n(18356),
        c = n(72221),
        h = n(32143),
        p = n(54536),
        x = n(81728),
        u = n(70579);
      const m = (0, s.Ay)(i.A)((e) => {
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
          setSettings: s,
          selectedSetting: g,
          setSelectedSetting: A,
        } = (0, a.useContext)(x.A);
        return (0, u.jsxs)(m, {
          children: [
            (0, u.jsx)(o.A, {
              component: "h1",
              sx: { fontWeight: "bold", color: "#fff" },
              children: t,
            }),
            n &&
              (0, u.jsx)(l.A, {
                direction: "row",
                spacing: 2,
                children: (0, u.jsxs)(r.A, {
                  fullWidth: !0,
                  size: "small",
                  sx: { minWidth: "200px" },
                  children: [
                    (0, u.jsx)(d.A, {
                      id: "demo-simple-select-label",
                      children: "Select School",
                    }),
                    (0, u.jsx)(c.A, {
                      labelId: "demo-simpless-select-filled-label",
                      id: "demo-simple-select-filled-l",
                      value: null === g || void 0 === g ? void 0 : g._id,
                      name: "setting",
                      onChange: (e) => {
                        const { name: t, value: n } = e.target;
                        A({ ...i.filter((e) => e._id == n)[0] });
                      },
                      IconComponent: (e) =>
                        (0, u.jsx)(p.A, { ...e, fontSize: "medium" }),
                      label: "Select school",
                      children:
                        null === i || void 0 === i
                          ? void 0
                          : i.map((e) =>
                              (0, u.jsx)(
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
    20486: (e, t, n) => {
      n.d(t, { A: () => _ });
      var i = n(34535),
        a = n(4598),
        s = n(79650),
        o = n(63336),
        l = n(71806),
        r = n(84882),
        d = n(28076),
        c = n(39652),
        h = n(73460),
        p = n(96446),
        x = n(81045),
        u = n(77739),
        m = n(17392),
        g = n(42518),
        A = n(19090),
        f = n(73368),
        j = n(85865),
        b = n(65043),
        y = n(63471),
        v = n(95540),
        w = n(79306),
        k = n(93851),
        S = n(95915),
        C = n(3341),
        M = n(47968),
        z = n(70579);
      const D = {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 2,
        },
        N = (0, i.Ay)(a.A)((e) => {
          let {} = e;
          return {
            "& .MuiSwitch-switchBase.Mui-checked": { color: "green" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "green",
            },
            "& .MuiSwitch-switchBase": { color: "red" },
            "& .MuiSwitch-switchBase + .MuiSwitch-track": {
              backgroundColor: "red",
            },
          };
        }),
        I = (e, t) =>
          "boolean" === typeof e[t.key]
            ? !0 === e[t.key]
              ? "Yes"
              : "No"
            : t.path && Object.keys(e[t.path] || {}).length > 0
            ? e[t.path][t.key] || "NA"
            : t.isDate
            ? e[t.key]
              ? new Date(e[t.key]).toDateString()
              : "NA"
            : "feedback" === t.key
            ? e[t.key]
              ? "".concat(e[t.key].substring(0, 50), "...")
              : "NA"
            : e[t.key];
      function _(e) {
        let {
          bodyData: t = [],
          bodyDataModal: n = "",
          tableKeys: i = [],
          actions: a = ["edit", "delete", "view", "card", "switch"],
          onEditClick: _ = () => {},
          onDeleteClick: T = () => {},
          onViewClick: R = () => {},
          onCardClick: P = () => {},
          onNavigateFeeMap: W = () => {},
          onToggleSwitch: F = () => {},
          toggleStatus: B = !1,
          isDataReady: O = !0,
          module: E = "",
          CustomAction: G = () => {},
          onUpdate: H = () => {},
          onDownloadClick: L = () => {},
        } = e;
        const [q, Y] = b.useState(0),
          [U, V] = b.useState(10),
          [K, J] = (0, b.useState)(!1),
          [X, Z] = (0, b.useState)(null),
          $ = () => {
            J(!1);
          },
          Q = (e) => (!0 === e[B] ? "Active" : "Inactive");
        return (0, z.jsxs)(z.Fragment, {
          children: [
            (0, z.jsxs)(s.A, {
              component: o.A,
              children: [
                (0, z.jsxs)(l.A, {
                  children: [
                    (0, z.jsx)(r.A, {
                      sx: {
                        backgroundColor: (e) =>
                          "dark" === e.palette.mode
                            ? e.palette.primary.dark
                            : e.palette.primary.light,
                      },
                      children: (0, z.jsxs)(d.A, {
                        children: [
                          (0, z.jsx)(c.A, {
                            align: "center",
                            sx: { fontWeight: "bold" },
                            children: "S.No",
                          }),
                          i.map((e, t) =>
                            (0, z.jsx)(
                              c.A,
                              {
                                sx: { fontWeight: "bold" },
                                align: "center",
                                children: e.name,
                              },
                              t + e.name
                            )
                          ),
                          a.length
                            ? (0, z.jsx)(c.A, {
                                sx: { fontWeight: "bold" },
                                align: "center",
                                children: "Action",
                              })
                            : null,
                        ],
                      }),
                    }),
                    (0, z.jsx)(h.A, {
                      children:
                        t.length && O
                          ? t.slice(q * U, q * U + U).map((e, t) =>
                              (0, z.jsxs)(
                                d.A,
                                {
                                  children: [
                                    (0, z.jsx)(c.A, {
                                      align: "center",
                                      children: t + 1,
                                    }),
                                    i.map((t, n) =>
                                      "image" === t.type
                                        ? (0, z.jsx)(
                                            c.A,
                                            {
                                              align: "center",
                                              children: (0, z.jsx)(p.A, {
                                                sx: {
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                },
                                                children: (0, z.jsx)(x.A, {
                                                  sx: {
                                                    alignSelf: "center",
                                                    objectFit: "contain",
                                                  },
                                                  src: e[t.key],
                                                }),
                                              }),
                                            },
                                            n
                                          )
                                        : (0, z.jsx)(
                                            c.A,
                                            {
                                              align: "center",
                                              children: I(e, t),
                                            },
                                            n
                                          )
                                    ),
                                    a.length
                                      ? (0, z.jsxs)(c.A, {
                                          sx: {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            columnGap: "5px",
                                          },
                                          children: [
                                            a.includes("edit") &&
                                              !e.checkOut &&
                                              (0, z.jsx)(u.A, {
                                                title: "Edit",
                                                children: (0, z.jsx)(m.A, {
                                                  onClick: () => _(e),
                                                  children: (0, z.jsx)(v.A, {
                                                    color: "primary",
                                                    fontSize: "small",
                                                  }),
                                                }),
                                              }),
                                            a.includes("delete") &&
                                              (0, z.jsx)(u.A, {
                                                title: "Delete",
                                                children: (0, z.jsx)(m.A, {
                                                  onClick: () =>
                                                    ((e) => {
                                                      Z(e), J(!0);
                                                    })(e),
                                                  children: (0, z.jsx)(y.A, {
                                                    fontSize: "small",
                                                    color: "error",
                                                  }),
                                                }),
                                              }),
                                            a.includes("view") &&
                                              (0, z.jsx)(u.A, {
                                                title: "View",
                                                children: (0, z.jsx)(m.A, {
                                                  onClick: () => R(e),
                                                  children: (0, z.jsx)(k.A, {
                                                    fontSize: "small",
                                                    color: "primary",
                                                  }),
                                                }),
                                              }),
                                            a.includes("card") &&
                                              (0, z.jsx)(u.A, {
                                                title: "Unbundle",
                                                children: (0, z.jsx)(g.A, {
                                                  size: "small",
                                                  variant: "contained",
                                                  onClick: () => P(e),
                                                  children: "Card",
                                                }),
                                              }),
                                            a.includes("switch") &&
                                              (0, z.jsx)(u.A, {
                                                title: Q(e),
                                                children: (0, z.jsx)(m.A, {
                                                  size: "small",
                                                  onClick: () => F(e),
                                                  children: (0, z.jsx)(N, {
                                                    size: "small",
                                                    checked: !0 === e[B],
                                                  }),
                                                }),
                                              }),
                                            a.includes("custom") &&
                                              (0, z.jsx)(G, {
                                                onEditClick: _,
                                                data: e,
                                                onUpdate: H,
                                                onNavigateFeeMap: W,
                                              }),
                                            a.includes("download") &&
                                              (0, z.jsx)(m.A, {
                                                size: "small",
                                                onClick: () => L(e),
                                                children: (0, z.jsx)(M.A, {
                                                  fontSize: "small",
                                                }),
                                              }),
                                          ],
                                        })
                                      : null,
                                  ],
                                },
                                e._id || t
                              )
                            )
                          : null,
                    }),
                  ],
                }),
                O
                  ? null
                  : (0, z.jsx)(p.A, {
                      sx: {
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "20px",
                      },
                      children: (0, z.jsx)(S.A, {
                        size: 30,
                        color: "dodgerblue",
                      }),
                    }),
                O ? (0, z.jsx)(w.A, { dataPresent: t.length, title: n }) : null,
                (0, z.jsx)(A.A, {
                  size: "small",
                  component: "div",
                  count: t && t.length ? t.length : 0,
                  page: q,
                  onPageChange: (e, t) => {
                    Y(t);
                  },
                  rowsPerPage: U,
                  onRowsPerPageChange: (e) => {
                    V(parseInt(e.target.value, 10)), Y(0);
                  },
                }),
              ],
            }),
            (0, z.jsx)(f.A, {
              open: K,
              onClose: $,
              children: (0, z.jsxs)(p.A, {
                sx: D,
                children: [
                  (0, z.jsx)(p.A, {
                    sx: { textAlign: "center", margin: "10px auto" },
                    children: (0, z.jsx)("img", {
                      src: C,
                      width: 50,
                      height: 50,
                    }),
                  }),
                  (0, z.jsx)(j.A, {
                    textAlign: "center",
                    sx: { fontSize: "18px", fontWeight: 700 },
                    children: "Delete Confirmation",
                  }),
                  (0, z.jsx)(j.A, {
                    sx: { mt: 2, textAlign: "center" },
                    children: "Are you sure want to delete this item?",
                  }),
                  (0, z.jsxs)(p.A, {
                    my: 3,
                    sx: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "15px",
                    },
                    children: [
                      (0, z.jsx)(g.A, {
                        size: "small",
                        color: "error",
                        variant: "contained",
                        onClick: $,
                        children: "Cancel",
                      }),
                      (0, z.jsx)(g.A, {
                        color: "primary",
                        size: "small",
                        variant: "contained",
                        onClick: () => {
                          T(X._id), J(!1);
                        },
                        children: "Delete",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
    79306: (e, t, n) => {
      n.d(t, { A: () => s });
      var i = n(85865),
        a = (n(65043), n(70579));
      function s(e) {
        let { dataPresent: t, title: n } = e;
        return t
          ? null
          : (0, a.jsxs)(i.A, {
              variant: "h6",
              sx: { textAlign: "center", margin: "5px", padding: "5px" },
              children: [n.charAt(0).toUpperCase() + n.slice(1), " not found!"],
            });
      }
    },
    15737: (e, t, n) => {
      n.d(t, { A: () => s });
      var i = n(96446),
        a = n(70579);
      const s = function (e) {
        const { children: t, value: n, index: s, ...o } = e;
        return (0, a.jsx)("div", {
          role: "tabpanel",
          hidden: n !== s,
          id: "simple-tabpanel-".concat(s),
          "aria-labelledby": "simple-tab-".concat(s),
          ...o,
          children: n === s && (0, a.jsx)(i.A, { children: t }),
        });
      };
    },
    4599: (e, t, n) => {
      n.d(t, { A: () => d });
      var i = n(96446),
        a = n(63336),
        s = n(69869),
        o = n(24056),
        l = (n(65043), n(70579));
      function r(e) {
        return {
          id: "simple-tab-".concat(e),
          "aria-controls": "simple-tabpanel-".concat(e),
        };
      }
      function d(e) {
        let { labels: t = [], onChange: n = () => {}, value: d = 0 } = e;
        return (0, l.jsx)(i.A, {
          component: a.A,
          sx: { marginBottom: "10px" },
          children: (0, l.jsx)(s.A, {
            value: d,
            onChange: n,
            "aria-label": "basic tabs example",
            variant: "scrollable",
            scrollButtons: "auto",
            allowScrollButtonsMobile: !0,
            children: t.map((e, t) =>
              (0, l.jsx)(
                o.A,
                {
                  sx: { fontWeight: "bold", fontSize: "12px" },
                  label: e,
                  ...r(t),
                },
                e
              )
            ),
          }),
        });
      }
    },
    95855: (e, t, n) => {
      n.d(t, { A: () => w });
      var i = n(65043),
        a = n(96446),
        s = n(26240),
        o = n(85865),
        l = n(42518),
        r = n(77739),
        d = n(17392),
        c = n(45903),
        h = n(83462),
        p = n(29347),
        x = n(35316),
        u = n(4219),
        m = n(30344),
        g = n(39336),
        A = n(33438),
        f = n(70579);
      function j(e) {
        let {
          open: t = !1,
          onClose: n = () => {},
          styles: i = {},
          selectedFiles: r = [],
          setSelectFiles: c = () => {},
          customOnChage: j = !1,
          onRemove: b = () => {},
        } = e;
        const y = (0, s.A)();
        let v = (0, m.A)(y.breakpoints.down("sm"));
        return (0, f.jsxs)(h.A, {
          fullScreen: v,
          open: t,
          onClose: n,
          PaperProps: { sx: { width: "100%", maxWidth: 650, ...i } },
          children: [
            (0, f.jsx)(u.A, {
              children: r.length > 1 ? "Selected files" : "Selected file",
            }),
            (0, f.jsx)(g.A, {}),
            (0, f.jsx)(x.A, {
              sx: { padding: "10px" },
              children: r.map(
                (e, t) => (
                  console.log(e.name, "gg"),
                  (0, f.jsxs)(
                    a.A,
                    {
                      sx: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                      children: [
                        (0, f.jsx)(o.A, { children: e.name }),
                        (0, f.jsx)(d.A, {
                          size: "small",
                          onClick: j
                            ? () => b(e.name)
                            : () => {
                                return (
                                  (t = e.name),
                                  void c(r.filter((e) => e.name !== t))
                                );
                                var t;
                              },
                          children: (0, f.jsx)(A.A, { fontSize: "small" }),
                        }),
                      ],
                    },
                    t
                  )
                )
              ),
            }),
            (0, f.jsx)(p.A, {
              children: (0, f.jsx)(l.A, {
                onClick: n,
                size: "small",
                variant: "contained",
                children: "Close",
              }),
            }),
          ],
        });
      }
      var b = n(93851),
        y = n(11206);
      const v = (0, c.A)(a.A)(() => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        columnGap: "5px",
      }));
      function w(e) {
        let {
          name: t,
          multi: n = !0,
          label: c = "default label",
          required: h = !1,
          onChange: p = () => {},
          value: x,
          selectedFiles: u = [],
          disabled: m = !1,
          setSelectedFiles: g = () => {},
          customOnChange: A = !1,
          onRemove: w = () => {},
          accept: k = "",
          previousFile: S = "",
          ...C
        } = e;
        (0, s.A)();
        const [M, z] = (0, i.useState)(!1);
        return (0, f.jsxs)(f.Fragment, {
          children: [
            (0, f.jsxs)(v, {
              mt: 1,
              children: [
                (0, f.jsxs)(a.A, {
                  component: "div",
                  onClick: () => z(!0),
                  sx: {
                    borderRadius: "5px",
                    padding: "8px",
                    backgroundColor: "white",
                    border: "1px solid lightgray",
                    height: "30px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  },
                  children: [
                    (0, f.jsx)(o.A, {
                      component: "div",
                      onClick: () => z(!0),
                      sx: {
                        fontWeight: "bold",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor: "white",
                        color: "black",
                        height: "30px",
                        width: "30px",
                        textAlign: "center",
                      },
                      children: u.length,
                    }),
                    (0, f.jsx)(b.A, { fontSize: "14px" }),
                  ],
                }),
                (0, f.jsxs)(l.A, {
                  fullWidth: !0,
                  component: "label",
                  size: "small",
                  variant: "outlined",
                  children: [
                    (0, f.jsx)("input", {
                      type: "file",
                      multiple: n,
                      accept: k,
                      hidden: !0,
                      onChange: A
                        ? (e) => p(e)
                        : (e) => {
                            const t = e.target.files;
                            if (t.length > 0) {
                              let e = [];
                              for (let n = 0; n < t.length; n++) {
                                const i = t[n];
                                e.push(i);
                              }
                              g([...e]);
                            } else console.log("No files selected");
                          },
                    }),
                    c,
                  ],
                }),
                S &&
                  (0, f.jsx)(r.A, {
                    title: "Uploaded File Link",
                    children: (0, f.jsx)(d.A, {
                      component: "div",
                      size: "small",
                      color: "primary",
                      variant: "outlined",
                      onClick: () => window.open(S, "_blank"),
                      children: (0, f.jsx)(y.A, { fontSize: "small" }),
                    }),
                  }),
              ],
            }),
            (0, f.jsx)(j, {
              open: M,
              selectedFiles: u,
              setSelectFiles: g,
              onClose: () => z(!1),
              customOnChage: A,
              onRemove: w,
            }),
          ],
        });
      }
    },
    83094: (e, t, n) => {
      n.d(t, { A: () => d });
      n(65043);
      var i = n(60446),
        a = n.n(i),
        s = n(58390),
        o = n(79344),
        l = n(89302),
        r = n(70579);
      const d = function (e) {
        let {
          name: t,
          label: n,
          formik: i,
          required: d,
          openTo: c = "day",
          views: h = ["year", "month", "day"],
          inputFormat: p = "DD/MM/YYYY",
          disabled: x = !1,
          disableFutureDates: u = !1,
        } = e;
        return (0, r.jsx)(s.$, {
          dateAdapter: l.R,
          children: (0, r.jsx)(o.l, {
            disableFuture: u,
            sx: {
              "& .MuiInputBase-input": { height: "8px" },
              marginTop: "16px",
              width: "100%",
            },
            required: d,
            name: t,
            variant: "outlined",
            size: "small",
            label: n,
            disabled: x,
            slotProps: { textField: { InputLabelProps: { fontSize: "90px" } } },
            openTo: c,
            closeOnSelect: !0,
            views: h,
            format: p,
            value: a()(i.values[t]) || null,
            onChange: (e) => i.setFieldValue(t, a()(e)),
          }),
        });
      };
    },
    91722: (e, t, n) => {
      var i = n(24994);
      t.A = void 0;
      var a = i(n(40039)),
        s = n(70579);
      t.A = (0, a.default)(
        (0, s.jsx)("path", {
          d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m-.22-13h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l4.15 2.49c.34.2.78.1.98-.24.21-.34.1-.79-.25-.99l-3.87-2.3V7.72c0-.4-.32-.72-.72-.72",
        }),
        "AccessTimeRounded"
      );
    },
    94992: (e, t, n) => {
      var i = n(24994);
      t.A = void 0;
      var a = i(n(40039)),
        s = n(70579);
      t.A = (0, a.default)(
        (0, s.jsx)("path", {
          d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2",
        }),
        "Circle"
      );
    },
    21337: (e, t, n) => {
      var i = n(24994);
      t.A = void 0;
      var a = i(n(40039)),
        s = n(70579);
      t.A = (0, a.default)(
        (0, s.jsx)("path", {
          d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z",
        }),
        "ExpandMore"
      );
    },
    27600: (e, t, n) => {
      n.d(t, { A: () => g });
      var i = n(98587),
        a = n(58168),
        s = n(65043),
        o = n(58387),
        l = n(68606),
        r = n(34535),
        d = n(72876),
        c = n(57056),
        h = n(32400);
      function p(e) {
        return (0, h.Ay)("MuiCardActions", e);
      }
      (0, c.A)("MuiCardActions", ["root", "spacing"]);
      var x = n(70579);
      const u = ["disableSpacing", "className"],
        m = (0, r.Ay)("div", {
          name: "MuiCardActions",
          slot: "Root",
          overridesResolver: (e, t) => {
            const { ownerState: n } = e;
            return [t.root, !n.disableSpacing && t.spacing];
          },
        })((e) => {
          let { ownerState: t } = e;
          return (0, a.A)(
            { display: "flex", alignItems: "center", padding: 8 },
            !t.disableSpacing && {
              "& > :not(style) ~ :not(style)": { marginLeft: 8 },
            }
          );
        }),
        g = s.forwardRef(function (e, t) {
          const n = (0, d.A)({ props: e, name: "MuiCardActions" }),
            { disableSpacing: s = !1, className: r } = n,
            c = (0, i.A)(n, u),
            h = (0, a.A)({}, n, { disableSpacing: s }),
            g = ((e) => {
              const { classes: t, disableSpacing: n } = e,
                i = { root: ["root", !n && "spacing"] };
              return (0, l.A)(i, p, t);
            })(h);
          return (0,
          x.jsx)(m, (0, a.A)({ className: (0, o.A)(g.root, r), ownerState: h, ref: t }, c));
        });
    },
    36591: (e, t, n) => {
      n.d(t, { A: () => f });
      var i = n(98587),
        a = n(58168),
        s = n(65043),
        o = n(58387),
        l = n(68606),
        r = n(72876),
        d = n(34535),
        c = n(57056),
        h = n(32400);
      function p(e) {
        return (0, h.Ay)("MuiCardMedia", e);
      }
      (0, c.A)("MuiCardMedia", ["root", "media", "img"]);
      var x = n(70579);
      const u = ["children", "className", "component", "image", "src", "style"],
        m = (0, d.Ay)("div", {
          name: "MuiCardMedia",
          slot: "Root",
          overridesResolver: (e, t) => {
            const { ownerState: n } = e,
              { isMediaComponent: i, isImageComponent: a } = n;
            return [t.root, i && t.media, a && t.img];
          },
        })((e) => {
          let { ownerState: t } = e;
          return (0, a.A)(
            {
              display: "block",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            },
            t.isMediaComponent && { width: "100%" },
            t.isImageComponent && { objectFit: "cover" }
          );
        }),
        g = ["video", "audio", "picture", "iframe", "img"],
        A = ["picture", "img"],
        f = s.forwardRef(function (e, t) {
          const n = (0, r.A)({ props: e, name: "MuiCardMedia" }),
            {
              children: s,
              className: d,
              component: c = "div",
              image: h,
              src: f,
              style: j,
            } = n,
            b = (0, i.A)(n, u),
            y = -1 !== g.indexOf(c),
            v =
              !y && h
                ? (0, a.A)({ backgroundImage: 'url("'.concat(h, '")') }, j)
                : j,
            w = (0, a.A)({}, n, {
              component: c,
              isMediaComponent: y,
              isImageComponent: -1 !== A.indexOf(c),
            }),
            k = ((e) => {
              const {
                  classes: t,
                  isMediaComponent: n,
                  isImageComponent: i,
                } = e,
                a = { root: ["root", n && "media", i && "img"] };
              return (0, l.A)(a, p, t);
            })(w);
          return (0,
          x.jsx)(m, (0, a.A)({ className: (0, o.A)(k.root, d), as: c, role: !y && h ? "img" : void 0, ref: t, style: v, ownerState: w, src: y ? h || f : void 0 }, b, { children: s }));
        });
    },
    61327: () => {},
    3341: (e, t, n) => {
      e.exports = n.p + "static/media/deleteicon.60b6f90a465370fb216b.png";
    },
  },
]);
//# sourceMappingURL=9963.b54a0fdc.chunk.js.map
