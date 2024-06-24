/** @format */

// /** @format */

// import React, { useContext, useEffect, useState } from "react";
// import PageHeader from "../../components/PageHeader";
// import { useFormik } from "formik";
// import FormSelect from "../../forms/FormSelect";
// import { PRIVATE_URLS } from "../../services/urlConstants";
// import { del, get, post, put } from "../../services/apiMethods";
// import SettingContext from "../../context/SettingsContext";
// import FileSelect from "../../forms/FileSelect";
// import { Box, Button, Card, Grid } from "@mui/material";

// export default function Credentials() {
//   const { selectedSetting } = useContext(SettingContext);

//   const [roles, setRoles] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [employees, setEmployee] = useState([]);

//   // get Roles
//   const getRoles = async () => {
//     try {
//       const { data } = await get(PRIVATE_URLS.role.list);

//       setRoles(
//         data.result.map((r) => ({
//           ...r,
//           label: r.name,
//           value: r._id,
//         }))
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // get class
//   const getClasses = async () => {
//     try {
//       const { data } = await get(PRIVATE_URLS.class.list, {
//         params: { schoolId: selectedSetting._id },
//       });
//       setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
//       entryFormik.setFieldValue("class", data.result[0]._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get section
//   const getSections = async () => {
//     try {
//       const { data } = await get(PRIVATE_URLS.section.list, {
//         params: {
//           schoolId: selectedSetting._id,
//           search: {
//             class: entryFormik.values.class,
//           },
//         },
//       });
//       setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
//       entryFormik.setFieldValue("section", data.result[0]._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get students
//   const getStudents = async () => {
//     try {
//       const { data } = await get(PRIVATE_URLS.student.list, {
//         params: {
//           schoolId: selectedSetting._id,
//           search: {
//             "academicInfo.class": entryFormik.values.class,
//             "academicInfo.section": entryFormik.values.section,
//           },
//         },
//       });
//       setStudents(
//         data.result.map((d) => ({
//           ...d,
//           label: d.basicInfo.name,
//           value: d._id,
//         }))
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // get Employee
//   const getEmployees = async () => {
//     try {
//       const { data } = await get(PRIVATE_URLS.employee.list, {
//         params: {
//           schoolId: selectedSetting._id,
//           search: {
//             role: entryFormik.values.userType,
//           },
//         },
//       });

//       setEmployee(
//         data.result.map((emp) => ({
//           ...emp,
//           label: emp.basicInfo.name,
//           value: emp._id,
//         }))
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Formik
//   const entryFormik = useFormik({
//     initialValues: {
//       userType: [],

//       user: "",
//       reasonToMeet: "",

//       class: "",
//       section: "",
//       roleName: "",
//     },
//     onSubmit: console.log("xsfcvbnm,"),
//     enableReinitialize: true,
//   });

//   useEffect(() => {
//     getRoles();
//     getClasses();
//   }, [selectedSetting]);

//   useEffect(() => {
//     if (entryFormik.values.class) {
//       getSections();
//     }
//   }, [entryFormik.values.class]);

//   useEffect(() => {
//     if (entryFormik.values.userType) {
//       let roleName = roles.find(
//         (r) => r._id === entryFormik.values.userType
//       )?.name;
//       entryFormik.setFieldValue("roleName", roleName);
//       getEmployees();
//       getStudents();
//     }
//   }, [entryFormik.values.userType]);
//   return (
//     <>
//       <PageHeader title="Credentials" />
//       <Box display="flex" justifyContent="center" alignItems="center">
//         <Box
//           sx={{
//             width: { xs: "100%", sm: "100%", md: "70%", lg: "50%" },
//           }}>
//           <Card sx={{ padding: "15px" }}>
//             <Grid rowSpacing={0} columnSpacing={2} container>
//               <Grid xs={12} md={12} lg={12} item>
//                 <FormSelect
//                   required={true}
//                   name="userType"
//                   formik={entryFormik}
//                   label="Select  User Type"
//                   options={roles}
//                 />
//               </Grid>

//               {entryFormik.values.roleName === "STUDENT" && (
//                 <>
//                   <Grid xs={12} md={12} lg={12} item>
//                     <FormSelect
//                       name="class"
//                       formik={entryFormik}
//                       label="Select Class"
//                       options={classes}
//                     />
//                   </Grid>
//                   <Grid xs={12} md={12} lg={12} item>
//                     <FormSelect
//                       name="section"
//                       formik={entryFormik}
//                       label="Select Section"
//                       options={sections}
//                     />
//                   </Grid>
//                 </>
//               )}

//               <Grid xs={12} md={12} lg={12} item>
//                 <FormSelect
//                   required={true}
//                   name="user"
//                   formik={entryFormik}
//                   label="Select  User"
//                   options={
//                     entryFormik.values.roleName === "STUDENT"
//                       ? students
//                       : employees
//                   }
//                 />
//               </Grid>
//               <Grid xs={12} md={12} lg={12} item>
//                 <Button size="small" variant="contained">
//                   Send Credentials
//                 </Button>
//               </Grid>
//             </Grid>
//           </Card>
//         </Box>
//       </Box>
//     </>
//   );
// }import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { Box, Button, Card, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";

export default function Credentials() {
  const { selectedSetting } = useContext(SettingContext);

  const [roles, setRoles] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [employees, setEmployees] = useState([]);

  // get Roles
  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);
      setRoles(
        data.result.map((r) => ({
          ...r,
          label: r.name,
          value: r._id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // get Classes
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
    } catch (error) {
      console.log(error);
    }
  };

  // get Sections
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
    } catch (error) {
      console.log(error);
    }
  };

  // get Students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            "academicInfo.class": entryFormik.values.class,
            "academicInfo.section": entryFormik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get Employees
  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            role: entryFormik.values.userType,
          },
        },
      });
      setEmployees(
        data.result.map((emp) => ({
          ...emp,
          label: emp.basicInfo.name,
          value: emp._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Formik
  const entryFormik = useFormik({
    initialValues: {
      userType: [],
      user: "",
      reasonToMeet: "",
      class: "",
      section: "",
      roleName: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    getRoles();
    getClasses();
    getEmployees();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    if ((entryFormik.values.class, entryFormik.values.section)) {
      getStudents();
    }
  }, [entryFormik.values.class, entryFormik.values.section]);

  console.log(roles, "dfghjknml,.");

  return (
    <>
      <PageHeader title="Credentials" />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "70%", lg: "50%" },
          }}>
          <Card sx={{ padding: "15px" }}>
            <Grid rowSpacing={0} columnSpacing={2} container>
              <Grid xs={12} md={12} lg={12} item>
                <FormSelect
                  required={true}
                  name="userType"
                  formik={entryFormik}
                  label="Select User Type"
                  options={roles}
                  multiple={true}
                />
              </Grid>

              <Grid xs={12} md={12} lg={12} item>
                {entryFormik.values.userType === "STUDENT" && (
                  <>
                    <FormSelect
                      name="class"
                      formik={entryFormik}
                      label="Select Class"
                      options={classes}
                    />
                    <FormSelect
                      name="section"
                      formik={entryFormik}
                      label="Select Section"
                      options={sections}
                    />

                    <FormSelect
                      required={true}
                      name="user"
                      formik={entryFormik}
                      label="Select Students"
                      options={students}
                    />
                  </>
                )}
              </Grid>

              <Grid xs={12} md={12} lg={12} item>
                <FormSelect
                  required={true}
                  name="user"
                  formik={entryFormik}
                  label="Select Employees"
                  options={employees}
                />
              </Grid>

              <Grid xs={12} md={12} lg={12} item>
                <Button
                  size="small"
                  variant="contained"
                  onClick={entryFormik.handleSubmit}>
                  Send Credentials
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </>
  );
}
