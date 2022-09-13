import type { NextPage } from 'next';
import { useAppDispatch } from '../../hooks/redux';
import { useEffect } from 'react';
import actions from 'store/actions';

const {
  initAppActions: {
    initApp
  }
} = actions;

const InitComponent: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initApp())
  }, [])

  return null;
};

export default InitComponent;

<template>
  <div class="c-page-form">
    <v-form ref="form" class="v-form__main v-form--with-actions" @submit.prevent="onSubmit">
    <span class="v-form__title mb-3">{{ $t('forms.accountInformations') }}</span>
    <c-file-input
    :show-file="true"
    :value="form.logo"
    :label="$i18n.t('forms.uploadPhoto')"
    @input="selectedLogo = $event; form.logo = null" />
    <v-row>
      <v-col cols="12" md="6">
        <c-text-field
          v-model="form.name"
        :label="$t('forms.clinicNameLabel')"
        :rules="[
        $rules.required,
        (v) => $rules.minLen(v, 2),
        (v) => $rules.maxLen(v, 30),
        ]"
        hide-details="auto"
        autocomplete="off"
        type="text"
        name="clinicName"
        outlined
        required />
      </v-col>
      <v-col cols="12" md="6">
        <c-text-field
          v-model="form.id"
        :label="$t('forms.clinicIdLabel')"
        :rules="[
        $rules.required,
        (v) => $rules.minLen(v, 2),
        (v) => $rules.maxLen(v, 30),
        ]"
        :disabled="!!clinicId"
        hide-details="auto"
        autocomplete="off"
        type="text"
        name="clinicId"
        outlined
        required />
      </v-col>
      <v-col cols="12" md="6">
        <c-text-field
          v-model="form.contactEmail"
        :rules="[$rules.required, $rules.email]"
        :label="$t('forms.emailLabel')"
        hide-details="auto"
        type="text"
        name="contactEmail"
        outlined
        required />
      </v-col>
      <v-col cols="12" md="6">
        <c-text-field
          v-model="form.contactName"
        :rules="[
        $rules.required,
        (v) => $rules.minLen(v, 2),
        (v) => $rules.maxLen(v, 30),
        ]"
        :label="$t('forms.contactPersonName')"
        hide-details="auto"
        name="contactName"
        type="text"
        outlined
        required />
      </v-col>
      <v-col cols="12" md="6">
        <c-select
          v-model="form.phoneNumber.type"
        :label="$t('forms.contactPhoneType')"
        :rules="[$rules.required]"
        :items="phoneTypes"
        :item-text="val => val.text"
        name="contactPhoneType"
        hide-details="auto"
        required
        outlined />
      </v-col>
      <v-col cols="12" md="6">
        <c-autocomplete
          v-model="form.phoneNumber.code"
        :label="$i18n.t('forms.countryCode')"
        :rules="[$rules.required]"
        :items="localStorage_phoneCodes"
        hide-details="auto"
        item-value="code"
        item-text="text"
        outlined
        required
        return-object
        @input="setPhoneCountryCode" />
      </v-col>
      <v-col cols="12" md="6">
        <c-text-field
          v-model="form.phoneNumber.number"
        :label="$i18n.t('userDetails.phoneNumber')"
        :rules="[$rules.required, $rules.phone]"
        :prefix="form.phoneNumber.countryCode ? `+${form.phoneNumber.countryCode}`: ''"
        :disabled="!form.phoneNumber.countryCode"
        hide-details="auto"
        type="tel"
        outlined
        required />
      </v-col>
    </v-row>
    <white-label v-if="!isLoading.whiteLabel" v-model="whiteLabel" />
    <span class="v-form__title mb-3">{{ $t('forms.address') }}</span>
    <address-block v-if="!isLoading.clinic" v-model="form.address" />
    <v-row>
      <v-col cols="12" class="pb-0">
        <span class="v-form__title mb-0">{{ $t('forms.appointmentsFeatures') }}</span>
      </v-col>
      <v-col cols="12" md="6">
        <c-select
          v-model="form.bookingType"
        :items="bookingTypeOptions"
        :label="$t('forms.bookingType')"
        :rules="[$rules.required]"
        item-text="label"
        hide-details="auto"
        multiple
        outlined
        @change="form.appointmentTypes = []" />
      </v-col>
      <v-col cols="12" md="6">
        <c-select
          v-model="form.appointmentTypes"
        :items="availableTimeModes"
        :rules="[$rules.required]"
        :label="$t('forms.appointmentsType')"
        hide-details="auto"
        item-text="label"
        multiple
        outlined />
      </v-col>
    </v-row>
    <emr-options v-if="!isLoading.clinic" v-model="form.emr" />
    <!-- WW remote-database -->
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-row>
          <v-col cols="10">
            <span class="v-form__title mb-0 mr-4">{{ $t('constants.remoteDb') }}</span>
            <v-switch
              v-model="remoteDB.turnedOn"
              class="remote-database-switch"
            :label="$t('constants.remoteDbConfigure')"
            hide-details="auto" />
          </v-col>
          <v-col
            v-if="remoteDB.turnedOn"
            cols="2"
            class="align-self-end">
            <v-btn
              color="primary"
              depressed
            @click="$openDialog({component: 'create-update-remote-database' })">
            {{ $t('buttons.add') }}
          </v-btn>
      </v-col>
    </v-row>
  </v-col>
</v-row>
<v-row v-if="remoteDB.turnedOn">
  <v-col cols="12" class="pb-0">
    <c-table
      ref="table"
    :headers="remoteDB.headers"
    :items="remoteDB.newDbs"
    disable-sort
    hide-footer>
    <template #menu="{ item }">
    <v-menu content-class="v-menu--list">
      <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>$dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="$openDialog({component: 'create-update-remote-database', props: {value: item} })">
      <v-list-item-title>{{ $i18n.t('forms.permissionsOptions.edit') }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</template>
</c-table>
</v-col>
</v-row>
<payment-methods
  v-if="!isLoading.clinic"
        :key="form.feeDetails && form.feeDetails.type"
:currency-value="form.currency_id"
:fee-details-value="form.feeDetails"
:is-subscriptions="isSubscriptionsPlan"
@currency-changed="val => { form.currency_id = val }"
@fee-details-changed="val => { form.feeDetails = val }" />
  <fee-form v-if="!isLoading.clinic" v-model="feeForm" :is-subscriptions="isSubscriptionsPlan" form-type="clinic" />
  <v-row>
  <v-col cols="12" md="6">
  <c-text-field
v-model="form.doctorsLimit"
:label="$t('constants.typeOptions.specialist')"
:rules="[$rules.required]"
hide-details="auto"
autocomplete="off"
type="number"
name="currentNumberDoctors"
outlined
required />
</v-col>
<v-col cols="12" md="6">
  <c-text-field
    v-model="form.emailFrom"
  :label="$i18n.t('forms.sendEmailsFrom')"
  :rules="[$rules.required, $rules.email]"
  hide-details="auto"
  autocomplete="off"
  type="email"
  name="emailFrom"
  outlined
  required />
</v-col>
<v-col cols="12" class="d-flex flex-wrap pt-0">
  <v-checkbox
    v-model="form.urgentCareManagement"
    class="mr-4 mt-0"
    hide-details="auto"
  :label="$t('basicMedicalExpressions.urgentCareManagement')" />
  <v-checkbox
  :input-value="!form.patientNotifications"
  class="mt-0"
  hide-details="auto"
  :label="$t('forms.disableEmailSMS')"
  @change="form.patientNotifications = !$event" />
</v-col>
</v-row>
<generate-sso v-if="clinicId" v-model="form.ssoTokens" :clinic-id="form.id" />
  <v-row>
  <v-col cols="12" class="pb-0">
  <span class="v-form__title mb-0">{{ $t('forms.otherSettings') }}</span>
</v-col>
</v-row>
<clinic-features v-if="!isLoading.clinic" v-model="form.features" :disabled-features="disabledFeatures" @switch="privilegiesChanged" />
  <provider-features v-if="!isLoading.clinic" v-model="form.providerPrivilegies" @switch="providerPermissionsChanged" />
  <communication-modes v-if="!isLoading.clinic" v-model="form.communicationModes" />
  <patient-features v-if="!isLoading.clinic" v-model="form.patientPrivilegies" />
  <admin-privilegies v-if="!isLoading.clinic" v-model="form.adminPrivilegies" />
  <v-row>
  <v-col cols="12">
  <v-checkbox
v-model="form.useCareclixClinicians"
:label="$t('forms.allowCareClixProviders')"
class="mt-0" />
  </v-col>
</v-row>

<div class="v-form__actions --fixed">
  <v-btn :to="{ name: 'Clinics' }" class="mr-3" large text exact>
  {{ clinicId ? $i18n.t('buttons.back') : $i18n.t('buttons.cancel') }}
</v-btn>
<v-btn :loading="isLoading.submit || isLoading.logo || isLoading.updateWhiteLabel" color="primary" type="submit" large>
{{ clinicId ? $i18n.t('buttons.update') : $i18n.t('buttons.create') }}
<v-icon small>$arrow-line-right</v-icon>
</v-btn>
</div>
</v-form>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CSelect from '@/components/ui/CSelect';
  import CFileInput from '@/components/ui/CFileInput';
  import CAutocomplete from '@/components/ui/CAutocomplete';
  import CTable from '@/components/ui/CTable';
  import AddressBlock from '@/components/forms/AddressBlock';
  import FeeForm from '@/components/forms/FeeForm/index';
  import WhiteLabel from './WhiteLabel';
  import EmrOptions from './EmrOptions';
  import PaymentMethods from './PaymentMethods';
  import GenerateSso from './GenerateSso';
  import ClinicFeatures from './ClinicFeatures';
  import ProviderFeatures from './ProviderFeatures';
  import CommunicationModes from './CommunicationModes';
  import PatientFeatures from './PatientFeatures';
  import AdminPrivilegies from './AdminPrivilegies';

  export default {
  name: 'FormClinic',
  components: {
  CSelect,
  CFileInput,
  CTable,
  CAutocomplete,
  WhiteLabel,
  AddressBlock,
  EmrOptions,
  FeeForm,
  PaymentMethods,
  GenerateSso,
  ClinicFeatures,
  ProviderFeatures,
  CommunicationModes,
  PatientFeatures,
  AdminPrivilegies,
},
  data() {
  return {
  form: {
  id: '',
  name: '',
  contactEmail: '',
  contactName: '',
  phoneNumber: {
  type: '',
  countryCode: '',
  code: '',
  number: '',
},
  address: {
  country: null,
  state: null,
  street: null,
  zipCode: null,
  city: null,
},
  bookingType: [],
  appointmentTypes: [],
  emr: null,
  // todo defauld db logic
  customProperties: null,
  currency_id: null,
  feeDetails: null,
  logo: null,
  doctorsLimit: null,
  emailFrom: null,
  urgentCareManagement: false,
  patientNotifications: false,
  features: [],
  providerPrivilegies: ['use:provider-waiting-room'],
  communicationModes: [],
  patientPrivilegies: [],
  adminPrivilegies: [],
  useCareclixClinicians: false,
  ssoTokens: null,
},
  // todo ww remote db
  remoteDB: {
  headers: [
{ text: 'constants.remoteDbName', value: 'prefixRegionDb' },
{ text: '', value: 'menu' },
  ],
  oldDbs: [],
  newDbs: [],
  turnedOn: null,
},
  feeForm: {
  fees: [
{ feeType: 'Urgent Primary Care', fee: 0, feeSubscription: 0 },
{ feeType: 'Primary Care', fee: 0, feeSubscription: 0 },
{ feeType: 'Behavioral Health', fee: 0, feeSubscription: 0 },
  ],
  specialityFees: [],
  clinicType: [],
},
  whiteLabel: null,
  selectedLogo: null,
  isLoading: {
  clinic: false,
  submit: false,
  logo: false,
  whiteLabel: false,
  updateWhiteLabel: false,
  // todo ww remote db
  remoteDb: false,
},
};
},
  watch: {
  paymentType(newValue, oldValue) {
  const subscriptionsPermissionEnabled = this.form.features.find(el => el.name === 'subscriptions');
  if (oldValue === 'Pillar' && newValue !== 'Pillar' && subscriptionsPermissionEnabled) {
  this.turnOffSubscriptionPermission();
  this.showAlertSubscriptionPermissionsTurnsOff();
}
},
},
  computed: {
  ...mapGetters({
  localStorage_phoneCodes: 'common/phoneCodes',
}),
  isSubscriptionsPlan() {
  return this.form.features.some(({ name }) => name === 'subscriptions');
},
  paymentType() {
  return this.form.feeDetails?.type;
},
  phoneTypes() {
  return [
{ text: this.$t('constants.phoneType.phone'), value: 'Phone' },
{ text: this.$t('constants.phoneType.office'), value: 'Office' },
{ text: this.$t('constants.phoneType.fax'), value: 'Fax' },
  ];
},
  bookingTypeOptions() {
  return [
{ label: this.$t('constants.bookingType.urgent'), value: 'UrgentCare' },
{ label: this.$t('constants.bookingType.normal'), value: 'Normal' },
  ];
},
  clinicId() {
  return this.$route.params.id;
},
  availableTimeModes() {
  return this.timeModeOptions.filter(mode => this.form.bookingType.find(type => type === mode.bookingType));
},
  timeModeOptions() {
  return [
{ label: this.$t('constants.timeModeOptions.chooseTime'), value: 'ChooseTime', bookingType: 'Normal' },
{ label: this.$t('constants.timeModeOptions.anytime'), value: 'Anytime', bookingType: 'Normal' },
{ label: this.$t('constants.timeModeOptions.now'), value: 'Now', bookingType: 'UrgentCare' },
  ];
},
  disabledFeatures() {
  const disabledF = [];

  if (this.paymentType !== 'Pillar') {
  disabledF.push('subscriptions');
}

  return disabledF;
},
},
  created() {
  this.$eventBus.$on('updateRemoteDbList', this.updateDbList);
},
  destroyed() {
  this.$eventBus.$off('updateRemoteDbList');
},
  mounted() {
  if (this.clinicId) {
  this.getClinic();
  this.getRemoteDb();
  this.getWhiteLabel();
}
},
  methods: {
  showAlertSubscriptionPermissionsTurnsOff() {
  this.$openDialog({
  component: 'confirmation',
  params: { width: 340, persistent: false },
  props: {
  type: 'error',
  title: 'warning',
  text: this.$t('notifications.subscriptionsWillBeDisabled'),
  submitText: this.$t('buttons.ok'),
},
});
},
  turnOffSubscriptionPermission() {
  this.form.features.splice(this.form.features.findIndex(el => el.name === 'subscriptions'), 1);
},
  setClinicForm(clinicForm) {
  ['id',
  'name',
  'contactEmail',
  'contactName',
  'phoneNumber',
  'address',
  'bookingType',
  'appointmentTypes',
  'emr',
  // todo default remote db
  'customProperties',
  'feeDetails',
  'doctorsLimit',
  'emailFrom',
  'urgentCareManagement',
  'patientNotifications',
  'features',
  'communicationModes',
  'useCareclixClinicians',
  'logo',
  'ssoTokens'].forEach(el => {
  this.form[el] = clinicForm[el];
});

  this.form.currency_id = clinicForm.currencyId;
  this.form.adminPrivilegies = clinicForm.permissionsAdmin.map(el => el.name);
  this.form.patientPrivilegies = clinicForm.permissionsPatient.map(el => el.name);
  this.form.providerPrivilegies = clinicForm.permissionsProvider.map(el => el.name);

  this.feeForm = {
  fees: JSON.parse(JSON.stringify(clinicForm.fees)),
  specialityFees: JSON.parse(JSON.stringify(clinicForm.specialityFees)),
  clinicType: [...clinicForm.clinicType],
};
},
  getWhiteLabel() {
  this.isLoading.whiteLabel = true;

  this.$api.whiteLabel.getWhiteLabelByClinicId(this.clinicId)
  .then(response => {
  const wl = response.data.payload;
  const newWl = {};

  ['termsAndConditions',
  'domain',
  'privacyPolice',
  'faqLink',
  'consent',
  'googlePlayLink',
  'appStoreLink',
  'subscribeLink',
  'unsubscribeLink',
  'logo',
  'favicon',
  'label',
  'phone',
  'signupLink',
  'primaryColor',
  'secondaryColor',
  'language'].forEach(el => {
  newWl[el] = wl[el] ? wl[el] : null;
});

  this.whiteLabel = { ...newWl };
})
  .catch(err => {
  console.log(this.$errorDecode(err));
})
  .finally(() => {
  this.isLoading.whiteLabel = false;
});
},
  getClinic() {
  this.isLoading.clinic = true;

  this.$api.clinics.getClinicById(this.clinicId)
  .then(response => { this.setClinicForm(response.data.payload); })
  .catch(err => { this.$notifyError(this.$errorDecode(err)); })
  .finally(() => { this.isLoading.clinic = false; });
},
  cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
},
  getRemoteDb() {
  this.isLoading.remoteDb = true;

  this.$api.database.getByClinicId(this.clinicId)
  .then(response => { this.setRemoteDB(response.data.payload); })
  .catch(err => { this.$notifyError(this.$errorDecode(err)); })
  .finally(() => { this.isLoading.remoteDb = false; });
},
  setRemoteDB(data) {
  this.remoteDB.turnedOn = data.length;
  this.remoteDB.oldDbs = this.cloneObject(data);
  this.remoteDB.newDbs = this.cloneObject(data);
},
  updateDbList(database) {
  if (database?.id) {
  const findNewIndex = this.remoteDB.newDbs.findIndex(db => db.id === database.id);
  this.remoteDB.newDbs[findNewIndex] = this.cloneObject(database);
} else {
  this.remoteDB.newDbs.push(this.cloneObject(database));
}
},
  onSubmit() {
  if (!this.$refs.form.validate()) return;

  this.form.feeDetails.subscriptionInitialFee = String(this.form.feeDetails.subscriptionInitialFee);
  this.isLoading.submit = true;
  const params = { ...this.$cleanPayload({ ...this.form }), ...this.feeForm };

  if (params.logo) delete params.logo;
  if (!params.ssoTokens) delete params.ssoTokens;
  if (this.clinicId) return this.doUpdateClinicLogic(params, this.clinicId);

  const request = this.clinicId
  ? () => this.$api.clinics.updateClinic(params, this.clinicId)
  : () => this.$api.clinics.addClinic(params);

  request()
  .then((response) => {
  this.$notifySuccess(`Clinic ${this.clinicId ? 'updated' : 'created'}`);
  this.handleDbRequests(response.data.payload.id);

  if (this.selectedLogo) this.updateClinicLogo(response.data.payload.id);
  this.updateWhiteLabel(response.data.payload.id);
  this.$router.push({ name: 'Clinics' });
})
  .catch(err => {
  this.$errorMessageHandler(err);
})
  .finally(() => {
  this.isLoading.submit = false;
});
},
  doUpdateClinicLogic(params, clinicId) {
  if (!this.remoteDB.turnedOn) return this.updateClinic(params, clinicId);
  this.handleDbRequests(clinicId);
  setTimeout(() => { this.updateClinic(params, clinicId); }, 0);
},
  updateClinic(params, clinicId) {
  this.isLoading.submit = true;

  this.$api.clinics.updateClinic(params, clinicId)
  .then(() => { this.$notifySuccess('Clinic updated'); })
  .catch(err => { this.$notifyError(this.$errorDecode(err)); })
  .finally(() => { this.isLoading.submit = false; });

  this.updateWhiteLabel(clinicId);
  if (this.selectedLogo) this.updateClinicLogo(clinicId);
},
  updateClinicLogo(clinicId) {
  const formData = new FormData();
  formData.append('logo', this.selectedLogo);

  this.isLoading.logo = true;

  this.$api.clinics.updateLogo(clinicId, formData)
  .then(() => { this.$notifySuccess('Clinic logo updated'); })
  .catch(err => { this.$notifyError(this.$errorDecode(err)); })
  .finally(() => { this.isLoading.logo = false; });
},
  async updateWhiteLabel(clinicId) {
  let existingWhiteLabel = null;
  try {
  existingWhiteLabel = await this.$api.whiteLabel.getWhiteLabelByClinicId(clinicId);
} catch (err) {
  console.error('get white label error: ', err);
}

  // remove WL if form is empty, but WL exist in database
  if (!this.whiteLabel && existingWhiteLabel) {
  this.deleteWhiteLabel(existingWhiteLabel.data.payload.domain);
  return;
}

  // add or update WL if form is not empty
  if (this.whiteLabel) {
  this.isLoading.updateWhiteLabel = true;

  const request = existingWhiteLabel ? this.$api.whiteLabel.update : this.$api.whiteLabel.add;
  const params = new FormData();
  const storeLinks = ['googlePlayLink', 'appStoreLink'];

  params.append('clinicId', clinicId);

  Object.keys(this.whiteLabel).forEach(key => {
  if (key === 'phone') {
  for (const phoneKey in this.whiteLabel.phone) {
  params.append(`phone[${phoneKey}]`, this.whiteLabel.phone[phoneKey]);
}
} else if (this.whiteLabel[key] || storeLinks.includes(key)) {
  params.append(key, this.whiteLabel[key]);
}
});

  request(params)
  .then(() => { this.$notifySuccess('White label updated'); })
  .catch(err => { this.$notifyError(this.$errorDecode(err)); })
  .finally(() => { this.isLoading.updateWhiteLabel = false; });
}
},
  deleteWhiteLabel(domain) {
  this.$api.whiteLabel.delete(domain)
  .then(() => { this.$notifySuccess('White label deleted'); })
  .catch(err => { this.$notifyError(this.$errorDecode(err)); })
  .finally(() => { this.isLoading.updateWhiteLabel = false; });
},
  setPhoneCountryCode(country) {
  this.form.phoneNumber.code = country.code;
  this.form.phoneNumber.countryCode = country.value;
},
  providerPermissionsChanged(name, value) {
  if (name === 'use:provider-waiting-room') {
  if (value) {
  this.form.features.splice(this.form.features.findIndex(el => el.name === 'clinic-waiting-room'), 1);
} else {
  this.form.features.push({ id: 13, name: 'clinic-waiting-room', displayName: 'Use Clinic waiting room' });
}
}
},
  privilegiesChanged(feature, value) {
  if (feature.name === 'clinic-waiting-room') {
  if (value) {
  this.form.providerPrivilegies.splice(this.form.providerPrivilegies.findIndex(el => el === 'use:provider-waiting-room'), 1);
} else {
  this.form.providerPrivilegies.push('use:provider-waiting-room');
}
}
},
  handleDbRequests(clinicId) {
  this.remoteDB.newDbs.forEach(db => this.handleRemoteDB(clinicId, db));
},
  async handleRemoteDB(clinicId, database) {
  if (!this.remoteDB.turnedOn) return;

  // create a new database
  if (!database?.id) {
  return await this.createRemoteDb(clinicId, database);
}

  // update existing database
  if (database?.id) {
  const findOld = this.remoteDB.oldDbs.find(item => item.id === database.id);
  const isChanged = JSON.stringify(findOld) !== JSON.stringify(database);
  if (!isChanged) return;
  return await this.updateRemoteDb(database.id, database);
}

  // todo ww remove ddatabase
},
  createRemoteDb(clinicId, db) {
  this.$api.database.create({ clinicId, ...this.$cleanPayload(db) })
  .then(() => {
  this.getRemoteDb();
  this.$notifySuccess(this.$t('notifications.remoteaDtabaseUpdated'));
})
  .catch((err) => { this.$notifyError(this.$errorDecode(err)); });
},
  updateRemoteDb(dbId, db) {
  this.$api.database.updateByDbId(dbId, { ...this.$cleanPayload(db) })
  .then(() => {
  this.getRemoteDb();
  this.$notifySuccess(this.$t('notifications.remoteaDtabaseUpdated'));
})
  .catch((err) => { this.$notifyError(this.$errorDecode(err)); });
},
  removeRemoteDb(clinicId) {
  this.$api.database.delete(clinicId)
  .then(() => {
  this.getRemoteDb();
  this.$notifySuccess(this.$t('notifications.remoteaDtabaseUpdated'));
})
  .catch((err) => { this.$notifyError(this.$errorDecode(err)); });
},
},
};
</script>
