/** @format */

export const PUBLIC_URLS = {
  account: {
    login: "/account/login",
  },
  school: {
    getSchools: "/school/listPublic",
  },
};
export const PRIVATE_URLS = {
  academicYear: {
    list: "/academicYear/list",
    create: "/academicYear/create",
    update: "/academicYear/update",
    delete: "/academicYear/delete",
    toggleActiveStatus: "/academicYear/toggleActiveStatus",
  },
  role: {
    list: "/role/list",
    create: "/role/create",
    update: "/role/update",
    delete: "/role/delete",
    getRoleKeys: "/role/getRoleKeys",
  },
  employee: {
    list: "/employee/list",
    create: "/employee/create",
    update: "/employee/update",
    delete: "/employee/delete",
    getEmpById: "/employee/details",
    updateLibraryMember: "/employee/updateLibraryMember",
    removeLibraryMember: "/employee/removeLibraryMember",
  },
  designation: {
    list: "/designation/list",
    create: "/designation/create",
    update: "/designation/update",
    delete: "/designation/delete",
  },
  department: {
    list: "/department/list",
    create: "/department/create",
    update: "/department/update",
    delete: "/department/delete",
  },

  offerLetter: {
    list: "/offerLetter/list",
    create: "/offerLetter/create",
    update: "/offerLetter/update",
    delete: "/offerLetter/delete",
  },

  experienceLetter: {
    list: "/experienceLetter/list",
    create: "/experienceLetter/create",
    update: "/experienceLetter/update",
    delete: "/experienceLetter/delete",
  },

  relievingLetter: {
    list: "/relievingLetter/list",
    create: "/relievingLetter/create",
    update: "/relievingLetter/update",
    delete: "/relievingLetter/delete",
  },
  school: {
    list: "/school/list",
    create: "/school/create",
    toggleActiveStatus: "/school/toggleActiveStatus",
    update: "/school/update",
    details: "/school/details",
    addFiles: "/school/addFiles",
    removeFile: "/school/removeFile",
  },
  class: {
    list: "/class/list",
    create: "/class/create",
    update: "/class/update",
    delete: "/class/delete",
  },
  section: {
    list: "/section/list",
    create: "/section/create",
    update: "/section/update",
    delete: "/section/delete",
  },
  subject: {
    list: "/subject/list",
    create: "/subject/create",
    update: "/subject/update",
    delete: "/subject/delete",
  },
  fileUpload: {
    list: "/fileUpload/list",
    create: "/fileUpload/create",
    update: "/fileUpload/update",
    delete: "/fileUpload/delete",
  },

  teacherActivity: {
    list: "/teacherActivity/list",
    create: "/teacherActivity/create",
    update: "/teacherActivity/update",
    delete: "/teacherActivity/delete",
  },
  gallery: {
    list: "/gallery/list",
    create: "/gallery/create",
    update: "/gallery/update",
    delete: "/gallery/delete",
    addFiles: "/gallery/addFiles",
    removeFile: "/gallery/removeFile",
    listPublic: "/gallery/listPublic",
  },
  assignment: {
    list: "/assignment/list",
    create: "/assignment/create",
    update: "/assignment/update",
    delete: "/assignment/delete",
  },
  notice: {
    list: "/notice/list",
    create: "/notice/create",
    update: "/notice/update",
    delete: "/notice/delete",
  },

  news: {
    list: "/news/list",
    create: "/news/create",
    update: "/news/update",
    delete: "/news/delete",
    listPublic: "/news/listPublic",
  },
  event: {
    list: "/event/list",
    create: "/event/create",
    update: "/event/update",
    delete: "/event/delete",
  },
  holiday: {
    list: "/holiday/list",
    create: "/holiday/create",
    update: "/holiday/update",
    delete: "/holiday/delete",
  },
  awards: {
    list: "/awards/list",
    create: "/awards/create",
    update: "/awards/update",
    delete: "/awards/delete",
    listPublic: "/awards/listPublic",
  },
  splashNews: {
    list: "/splashNews/list",
    create: "/splashNews/create",
    update: "/splashNews/update",
    delete: "/splashNews/delete",
    toggle: "/splashNews/toggleEnable",
  },
  student: {
    list: "/student/list",
    create: "/student/create",
    update: "/student/update",
    delete: "/student/delete",
    details: "/student/details",
    overView: "/student/overView",
    promote: "/student/promote",
    resuffle: "/student/resuffle",
    updateTransportMember: "/student/updateTransportMember",
    removeTransportMember: "/student/removeTransportMember",

    updateLibraryMember: "/student/updateLibraryMember",
    removeLibraryMember: "/student/removeLibraryMember",

    updateHostelMember: "/student/updateHostelMember",
    removeHostelMember: "/student/removeHostelMember",
  },
  studentActivity: {
    list: "/studentActivity/list",
    create: "/studentActivity/create",
    update: "/studentActivity/update",
    delete: "/studentActivity/delete",
  },
  course: {
    list: "/course/list",
    create: "/course/create",
    update: "/course/update",
    delete: "/course/delete",
    uploadCourseMaterial: "/course/uploadCourseMaterial",
    deleteMaterial: "/course/deleteCourseMaterial",
  },
  meeting: {
    list: "/meeting/list",
    create: "/meeting/create",
    update: "/meeting/update",
    delete: "/meeting/delete",
    join: "/meeting/join",
  },
  visitorInfo: {
    list: "/visitorInfo/list",
    create: "/visitorInfo/create",
    update: "/visitorInfo/update",
    delete: "/visitorInfo/delete",
  },

  studentCheckout: {
    list: "/studentCheckout/list",
    update: "/studentCheckout/update",
    delete: "/studentCheckout/delete",
    downloadPdf: "/studentCheckout/downloadPdf",
    donwloadExcel: "/studentCheckout/downloadExcel",
  },
  guardianFeedback: {
    list: "/guardianFeedback/list",
    listPublic: "/guardianFeedback/listPublic",
    create: "/guardianFeedback/create",
    update: "/guardianFeedback/update",
    delete: "/guardianFeedback/delete",
  },
  examGrade: {
    list: "/examGrade/list",
    create: "/examGrade/create",
    update: "/examGrade/update",
    delete: "/examGrade/delete",
  },
  examTerm: {
    list: "/examTerm/list",
    create: "/examTerm/create",
    update: "/examTerm/update",
    delete: "/examTerm/delete",
  },
  examSchedule: {
    list: "/examSchedule/list",
    create: "/examSchedule/create",
    update: "/examSchedule/update",
    delete: "/examSchedule/delete",
  },
  receiptTitle: {
    list: "/receiptTitle/list",
    create: "/receiptTitle/create",
    update: "/receiptTitle/update",
    toggleActiveStatus: "/receiptTitle/toggleActiveStatus",
  },
  courseContent: {
    list: "/courseContent/list",
    create: "/courseContent/create",
    update: "/courseContent/updateChapterDetails",
    delete: "/courseContent/deleteChapter",
    // create content
    addContentToChapter: "/courseContent/addContentToChapter",
    updateContent: "/courseContent/updateContent",
    deleteContent: "/courseContent/deleteContent",
    getDetailsTeachers: "courseContent/getDetailsTeachers",
  },
  roomType: {
    list: "/roomType/list",
    create: "/roomType/create",
    update: "/roomType/update",
    delete: "/roomType/delete",
  },
  room: {
    list: "/room/list",
    create: "/room/create",
    update: "/room/update",
    delete: "/room/delete",
    updateBed: "/room/updateBed",
    deleteBed: "/room/deleteBed",
  },
  hostel: {
    list: "/hostel/list",
    create: "/hostel/create",
    update: "/hostel/update",
    delete: "/hostel/delete",
  },
  firm: {
    list: "/firm/list",
    create: "/firm/create",
    update: "/firm/update",
    delete: "/firm/delete",
  },
  vehicle: {
    list: "/vehicle/list",
    create: "/vehicle/create",
    update: "/vehicle/update",
    delete: "/vehicle/delete",
  },
  route: {
    list: "/route/list",
    create: "/route/create",
    update: "/route/update",
    delete: "/route/delete",
    addStop: "/route/addStop",
    removeStop: "/route/removeStop",
    updateStop: "/route/updateStop",
  },

  vehicleLog: {
    list: "/vehicleLog/list",
    create: "/vehicleLog/create",
    update: "/vehicleLog/update",
    delete: "/vehicleLog/delete",
    downloadPdf: "/vehicleLog/downloadPdf",
  },

  maintenanceFuel: {
    list: "/maintenance/listFuel",
    create: "/maintenance/createFuel",
    update: "/maintenance/updateFuel",
    delete: "/maintenance/deleteFuel",
  },

  maintenanceRepair: {
    list: "/maintenance/listRepair",
    create: "/maintenance/createRepair",
    update: "/maintenance/updateRepair",
    delete: "/maintenance/deleteRepair",
  },

  maintenanceTyre: {
    list: "/maintenance/listTyre",
    create: "/maintenance/createTyre",
    update: "/maintenance/updateTyre",
    delete: "/maintenance/deleteTyre",
  },

  maintenanceGreecing: {
    list: "/maintenance/listGreecing",
    create: "/maintenance/createGreecing",
    update: "/maintenance/updateGreecing",
    delete: "/maintenance/deleteGreecing",
  },

  feeMapCategory: {
    list: "/feeMapCategory/list",
    create: "/feeMapCategory/create",
    update: "/feeMapCategory/update",
    delete: "/feeMapCategory/delete",
  },
  feeMap: {
    list: "/feeMap/list",
    create: "/feeMap/create",
    update: "/feeMap/update",
    delete: "/feeMap/delete",
  },
  receipt: {
    getFeeDetails: "/receipt/getFeeDetails",
    collectFees: "/receipt/collectFees",
    previewReceipt: "/receipt/previewReceipt",
    getReceiptsPaidWithCheque: "/receipt/getReceiptsPaidWithCheque",
    updateSingleReceiptReconciliationStatusStatus:
      "/receipt/updateSingleReceiptReconciliationStatus",
    updateMultipleReceiptReconciliationStatus:
      "/receipt/updateMultipleReceiptReconciliationStatus",
    getAmountCollectedWithDifferentModes:
      "/receipt/getAmountCollectedWithDifferentModes",
    getBalanceFeeReport: "/receipt/getBalanceFeeReport",
    downloadBalanceFeeReport: "/receipt/downloadBalanceFeeReport",
    getAllReceipts: "/receipt/getAllReceipts",
    downloadReceipt: "/receipt/downloadReceipt",
    downloadReceiptStaff: "/receipt/downloadReceiptStaff",
    downloadFeeOverView: "/receipt/downloadFeeOverView",
    getAllPastDues: "/receipt/getAllPastDues",
    getMyReceipts: "/receipt/getMyReceipts",
  },
  salaryGrade: {
    list: "/salaryGrade/list",
    create: "/salaryGrade/create",
    update: "/salaryGrade/update",
    delete: "/salaryGrade/delete",
  },
  paymentHistory: {
    downloadPdf: "/paymentHistory/downloadPdf",
    list: "/paymentHistory/list",
    downloadDeductionPdf: "/paymentHistory/downloadDeductionPdf",
  },

  book: {
    list: "/book/list",
    create: "/book/create",
    update: "/book/update",
    delete: "/book/delete",
  },

  bookIssue: {
    list: "/bookIssue/list",
    create: "/bookIssue/create",
    submit: "/bookIssue/submit",
    delete: "/bookIssue/delete",
    downloadPdf: "/bookIssue/downloadPdf",
    downloadExcel: "/bookIssue/downloadExcel",
  },
  periodical: {
    list: "/periodical/list",
    create: "/periodical/create",
    update: "/periodical/update",
    delete: "/periodical/delete",
  },
  leaveType: {
    list: "/leaveType/list",
    create: "/leaveType/create",
    update: "/leaveType/update",
    delete: "/leaveType/delete",
  },
  leaveApplication: {
    list: "/leaveApplication/list",
    create: "/leaveApplication/createApplicationForEmployee",
    listEmployeeApplications: "/leaveApplication/listEmployeeApplications",
    employeeLeaveCredits: "/leaveApplication/employeeLeaveCredits",
    approveLeave: "/leaveApplication/approveLeave",
    rejectLeave: "/leaveApplication/rejectLeave",
    downloadExcel: "/leaveApplication/downloadExcel",
    downloadPdf: "/leaveApplication/downloadPdf",
  },
  studentMarks: {
    listStudentMarks: "/studentMark/listStudentMarks",
    updateStudentsMarks: "/studentMark/updateStudentsMarks",
    getbulkUpdateStudentMarks: "/studentMark/getbulkUpdateStudentMarks",
    bulkUpdateStudentMarks: "/studentMark/bulkUpdateStudentMarks",
  },
  teacherActivity: {
    list: "/teacherActivity/list",
    create: "/teacherActivity/create",
    update: "/teacherActivity/update",
    delete: "/teacherActivity/delete",
  },
};
