export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: [
          ...action.payload
        ]
      };
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnoses: [
          ...state.diagnoses,
          action.payload
        ]
      };
    case "ADD_Entry":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries:  state.patients[action.payload.id].entries.concat(action.payload.entry)
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList) => {
  return {
    type: "SET_PATIENT_LIST", 
    payload: patientList
  };
};

export const addPatient = (patient) => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnosesList = (diagnosesList) => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesList
  };
};

export const addDiagnosis = (diagnosis) => {
  return {
    type: "ADD_DIAGNOSIS",
    payload: diagnosis
  };
};

export const addEntry = (entry, id) => {
  return {
    type: "ADD_Entry",
    payload: { entry, id }
  };
};