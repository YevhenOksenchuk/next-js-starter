import InitComponent from './InitComponent';

export default InitComponent;

<template>
  <v-form ref="formDb" @submit.prevent="save">
  <v-row>
    <v-col cols="12" class="pb-0">
      <span class="v-form__permissions-title pt-0">{{ $t('constants.remoteDbSettings') }}</span>
    </v-col>
    <v-col cols="12" md="6">
      <c-autocomplete
        v-model="database.prefixRegionDb"
      :label="$t('forms.countryLabel')"
      :rules="[() => $rules.required(database.prefixRegionDb)]"
      :items="localStorage_phoneCodes"
      hide-details="auto"
      item-value="name"
      item-text="name"
      required
      return-object
      outlined
      @input="setCountry" />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.hostDb"
      :label="$t('constants.remoteDbHost')"
      :rules="[$rules.required]"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="remoteDbHost"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.portDb"
      :label="$t('forms.port')"
      :rules="[$rules.required, $rules.numeric]"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="portDb"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.dbName"
      :label="$t('forms.databaseName')"
      :rules="[$rules.required]"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="dbName"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.loginToDb"
      :label="$t('constants.remoteDbLogin')"
      :rules="[$rules.required]"
      hide-details="auto"
      autocomplete="new-password"
      type="text"
      name="remoteDbLogin"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.passwordToDb"
      :label="$t('constants.remoteDbPassword')"
      :rules="[$rules.required]"
      hide-details="auto"
      autocomplete="new-password"
      :type="showPass ? 'text' : 'password'"
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      name="remoteDbPassword"
      outlined
      required
      @click:append="showPass = !showPass" />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.accessKeyStorage"
      :label="$t('constants.remoteDbAccessKey')"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="remoteDbAccessKey"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.secretKeyStorage"
      :label="$t('constants.remoteDbSecretKey')"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="remoteDbSecretKey"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.regionNameStorage"
      :label="$t('constants.remoteDbRegionName')"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="remoteDbRegionName"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.hostStorage"
      :label="$t('forms.hostStorage')"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="hostStorage"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.bucketNameStorage"
      :label="$t('constants.remoteStorageBucketName')"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="remoteStorageBucketName"
      outlined
      required />
    </v-col>
    <v-col cols="12" md="6">
      <c-text-field
        v-model="database.outputFormat"
      :label="$t('constants.remoteDbOutputFormat')"
      hide-details="auto"
      autocomplete="off"
      type="text"
      name="remoteDbOutputFormat"
      outlined
      required />
    </v-col>
  </v-row>
  <v-row>
    <v-col align="right">
      <v-btn
        text
        class="mr-5"
        color="grey-dark-100"
        large
      @click="$emit('cancel')">
      {{ $t('buttons.cancel') }}
    </v-btn>
    <v-btn
      class="text--white"
      large
      color="primary"
      depressed
      type="submit">
      {{ $t('buttons.save') }}
    </v-btn>
  </v-col>
</v-row>
</v-form>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
  name: 'RemoteDatabase',
  props: {
  value: { type: Object, default: null },
  loading: { type: Boolean, default: false },
},
  data() {
  return {
  showPass: false,
  database: {
  prefixRegionDb: '',
  hostDb: '',
  portDb: '',
  dbName: '',
  loginToDb: '',
  passwordToDb: '',
  accessKeyStorage: '',
  secretKeyStorage: '',
  regionNameStorage: '',
  hostStorage: '',
  bucketNameStorage: '',
  outputFormat: '',
},
};
},
  computed: {
  ...mapGetters({
  localStorage_phoneCodes: 'common/phoneCodes',
}),
},
  created() {
  if (this.value && this.value.hostDb) {
  this.database = this.value;
  this.database.prefixRegionDb = this.database.prefixRegionDb
  .split('_')
  .map(el => el[0].toUpperCase() + el.slice(1))
  .join(' ');
}
},
  methods: {
  setCountry(country) {
  this.database.prefixRegionDb = country.name;
},
  save() {
  if (!this.$refs.formDb.validate()) return;
  this.$emit('update', this.database);
},
},
};
</script>

<style lang="scss" scoped>
  .remote-database-switch {
  padding-top: 0;
  margin-bottom: 5px;
  ::v-deep {
  .v-input__control .v-input__slot {
  display: flex;
  flex-direction: row-reverse;
  .v-label {
  margin-right: 12px;
}
}
}
}
</style>
