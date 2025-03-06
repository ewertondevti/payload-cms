import { ReadOnlyStateConfig, StateConfig } from "../utils/StateConfig";

export type RelationshipOptions = "unknown" | "unmarried" | "married" | "separated" | "divorced";
type StateKeys = {
  relationship?: RelationshipOptions;
  perished?: boolean;
  foreignRegistration?: boolean;
};
type StateValues = {
  showPerishedRadioGroup?: boolean;
  showForeignRegistrationRadioGroup?: boolean;
  showIdentificationForm?: boolean;
  showAddressForm?: boolean;
  submitEnabled?: boolean;
};
const stateConfig = new StateConfig<StateKeys, StateValues>();
stateConfig.set({}, {});

stateConfig.set({ relationship: "unknown" }, { submitEnabled: true });

stateConfig.set(
  { relationship: "unmarried" },
  { showPerishedRadioGroup: true },
);
stateConfig.set(
  { relationship: "unmarried", perished: true },
  {
    showPerishedRadioGroup: true,
    showIdentificationForm: true,
    submitEnabled: true,
  },
);
stateConfig.set(
  { relationship: "unmarried", perished: false },
  {
    showPerishedRadioGroup: true,
    showIdentificationForm: true,
    showAddressForm: true,
    submitEnabled: true,
  },
);

stateConfig.set({ relationship: "married" }, { showPerishedRadioGroup: true });
stateConfig.set(
  { relationship: "married", perished: true },
  { showPerishedRadioGroup: true, showForeignRegistrationRadioGroup: true },
);
stateConfig.set(
  { relationship: "married", perished: true, foreignRegistration: true },
  {
    showPerishedRadioGroup: true,
    showForeignRegistrationRadioGroup: true,
    showIdentificationForm: true,
    submitEnabled: true,
  },
);
stateConfig.set(
  { relationship: "married", perished: true, foreignRegistration: false },
  {
    showPerishedRadioGroup: true,
    showForeignRegistrationRadioGroup: true,
    submitEnabled: true,
  },
);
stateConfig.set(
  { relationship: "married", perished: false },
  {
    showPerishedRadioGroup: true,
    showIdentificationForm: true,
    showAddressForm: true,
    submitEnabled: true,
  },
);

stateConfig.set(
  { relationship: "separated" },
  { showPerishedRadioGroup: true },
);
stateConfig.set(
  { relationship: "separated", perished: true },
  { showPerishedRadioGroup: true, submitEnabled: true },
);
stateConfig.set({relationship: "separated", perished: false}, {showPerishedRadioGroup: true, showIdentificationForm: true, showAddressForm: true, submitEnabled: true});

stateConfig.set({ relationship: "divorced" }, { showPerishedRadioGroup: true });
stateConfig.set(
  { relationship: "divorced", perished: true },
  { showPerishedRadioGroup: true, submitEnabled: true },
);
stateConfig.set({relationship: "divorced", perished: false}, {showPerishedRadioGroup: true, showIdentificationForm: true, showAddressForm: true, submitEnabled: true});

export default stateConfig as ReadOnlyStateConfig<StateKeys, StateValues>;