export const initUserList = [
   {
      createdBy: "",
      createdOn: "",
      lastModifiedBy: "",
      lastModifiedOn: "",
      id: 0,
      first_name: "",
      last_name: "",
      age: 0,
      gender: "",
      salary: 0,
      email: "",
      userEntity: {
         createdBy: "",
         createdOn: "",
         lastModifiedBy: "",
         lastModifiedOn: "",
         id: 0,
         username: "",
         password: "",
         salt: "",
         roles: [
            {
               id: 0,
               name: "",
            },
         ],
         errorMessage: null,
      },
      departments: [
         {
            createdBy: "",
            createdOn: "",
            lastModifiedBy: "",
            lastModifiedOn: "",
            departmentId: {
               id: 0,
               employee_id: 0,
            },
            role: "",
         },
      ],
      projects: [
         {
            createdBy: "",
            createdOn: "",
            lastModifiedBy: "",
            lastModifiedOn: "",
            projectId: {
               id: 0,
               employee_id: 0,
            },
            project_name: "",
         },
      ],
      errorMessage: null,
   },
];

export const initDepList = [
   {
      createdBy: "",
      createdOn: "",
      lastModifiedBy: "",
      lastModifiedOn: "",
      id: 0,
      role: "",
   },
];

export const initProjList = [
   {
      createdBy: "",
      createdOn: "",
      lastModifiedBy: "",
      lastModifiedOn: "",
      id: 0,
      projectName: "",
   },
];
