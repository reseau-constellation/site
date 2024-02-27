<template>
  <span>
    <v-row class="pa-6">
      <v-col :cols="12">
        <v-card
          class="text-primary"
          variant="flat"
          max-width="200"
          href="/"
          :title="'Retour'"
          prepend-icon="mdi-arrow-left-top"
        ></v-card>
      </v-col>
      <v-col
        :cols="12"
        :class="{ 'my-auto': true, 'd-flex': true, 'text-center': !mdAndUp }"
      >
        <div style="width: 100%">
          <h1
            :class="{
              'text-h1': mdAndUp,
              'text-h4': !mdAndUp,
              'font-weight-bold': true,
            }"
          >
            <v-icon
              size="small"
              icon="mdi-download"
            />Téléchargements
          </h1>
          <div
            :class="{
              'text-h4': mdAndUp,
              'text-h6': !mdAndUp,
              'font-weight-light': true,
              'mb-n1': true,
            }"
          >
            Installer Constellation sur votre ordinateur
          </div>
        </div>
      </v-col>

      <v-col :cols="mdAndUp ? 3 : 12">
        <v-autocomplete
          v-model="version"
          :label="t('téléchargements.options.version')"
          :items="[
            { title: 'Toutes', value: 'toutes' },
            ...versionsDisponibles.map(v => ({ title: v, value: v })),
          ]"
          variant="outlined"
        ></v-autocomplete>
      </v-col>
      <v-col :cols="mdAndUp ? 3 : 12">
        <v-autocomplete
          v-model="so"
          :label="t('téléchargements.options.so')"
          :items="[
            { title: 'Tous', value: 'tous' },
            ...soDisponibles.map(s => ({
              title: t(`téléchargements.so.${s}`),
              value: s,
            })),
          ]"
          variant="outlined"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center pa-6">
      <v-col
        v-for="t in téléchargementsSélectionnés"
        :key="t.url"
        cols="auto"
      >
        <carte-telechargement v-bind="t" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        :cols="12"
        class="text-center"
      >
        <v-btn
          class="mx-auto"
          append-icon="mdi-open-in-new"
          :href="URL_TÉLÉCHARGEMENTS"
          >Voir toutes</v-btn
        >
      </v-col>
    </v-row>
  </span>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import semver from 'semver';

import CarteTelechargement from './CarteTéléchargement.vue';

import {
  InfoTéléchargement,
  URL_TÉLÉCHARGEMENTS,
  correspExtentions,
  obtTousLesTéléchargements,
  plateforme,
} from '@/utils/téléchargements';
import { கிளிமூக்கை_பயன்படுத்து } from '@lassi-js/kilimukku-vue';

const { mdAndUp } = useDisplay();

const { மொழியாக்கம்_பயன்படுத்து } = கிளிமூக்கை_பயன்படுத்து();
const { $மொ: t } = மொழியாக்கம்_பயன்படுத்து({});

const version = ref<string>();
const so = ref<string>();
onMounted(() => {
  if (['linux', 'windows', 'mac'].includes(plateforme() as string)) {
    so.value = plateforme();
  }
});

const disponibles = ref<InfoTéléchargement[]>();
onMounted(async () => {
  disponibles.value = await obtTousLesTéléchargements();
  version.value = disponibles.value.sort((a, b) =>
    semver.gt(a.version, b.version) ? -1 : 1,
  )[0].version;
});
const versionsDisponibles = computed(() => {
  const versions = new Set<string>();
  (disponibles.value || []).forEach(t => versions.add(t.version.replace(/^v/, '')));
  return [...versions];
});

const soDisponibles = computed(() => {
  return Object.keys(correspExtentions);
});

const téléchargementsSélectionnés = computed(() => {
  console.log(so.value);
  return disponibles.value?.filter(
    d =>
      (so.value === 'tous' || d.so === so.value) &&
      (version.value === 'toutes' || d.version.replace(/^v/, '') === version.value),
  );
});
</script>
