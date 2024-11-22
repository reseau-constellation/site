<template>
  <span>
    <v-row class="pa-6">
      <v-col :cols="12">
        <v-card
          class="text-primary"
          variant="flat"
          max-width="200"
          href="/"
          :title="t('téléchargements.retour')"
          prepend-icon="mdi-arrow-left-top"
        ></v-card>
      </v-col>
      <v-col
        v-if="mdAndUp"
        :cols="mdAndUp ? 4 : 12"
        class="pa-6"
      >
        <v-img
          height="300"
          :src="imgLogo"
        />
      </v-col>
      <v-col
        :cols="mdAndUp ? 8 : 12"
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
            {{ t('téléchargements.titre') }}
          </h1>
          <div
            :class="{
              'text-h4': mdAndUp,
              'text-h6': !mdAndUp,
              'font-weight-light': true,
              'mb-n1': true,
            }"
          >
            <v-icon
              size="small"
              icon="mdi-download"
            />
            {{ t('téléchargements.sousTitre') }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="d-flex align-center justify-center pa-6"
      style="background-color: rgb(242, 247, 252)"
    >
      <v-col cols="12"
        ><h1 class="text-h3 font-weight-bold text-center">
          {{ t('téléchargements.contrôles.titre') }}
        </h1></v-col
      >
      <v-col :cols="mdAndUp ? 3 : 12">
        <v-autocomplete
          v-model="version"
          :label="t('téléchargements.options.version')"
          :items="[
            { title: t('téléchargements.toutesVersions'), value: 'toutes' },
            ...versionsDisponibles.map(v => ({ title: v, value: v })),
          ]"
          variant="outlined"
        ></v-autocomplete>
      </v-col>
      <v-col :cols="mdAndUp ? 3 : 12">
        <v-autocomplete
          v-model="se"
          :label="t('téléchargements.options.se')"
          :items="[
            { title: t('téléchargements.se.tous'), value: 'tous' },
            ...soDisponibles.map(s => ({
              title: t(`téléchargements.se.${s}`),
              value: s,
            })),
          ]"
          variant="outlined"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row class="d-flex align-center justify-center pa-6">
      <v-expand-transition>
        <indice-installation-apple
          v-show="surPlateforme === 'mac' && (se === 'mac' || se === 'tous')"
        />
      </v-expand-transition>
    </v-row>

    <v-row class="d-flex align-center justify-center pa-6">
      <v-col
        v-for="t in téléchargementsSélectionnés"
        :key="t.url"
        cols="auto"
      >
        <carte-telechargement v-bind="t" />
      </v-col>
      <v-col cols="auto">
        <v-card width="300">
          <v-img
            src="@/assets/undraw/undraw_treasure_of-9-i.svg"
            class="ma-4"
            contain
            max-height="150"
          ></v-img>
          <v-card-item class="text-center">
            <v-card-title>
              {{ t(`téléchargements.pasTrouvé`) }}
            </v-card-title>
            <v-card-subtitle>
              {{ t('téléchargements.voirPlus') }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text class="my-2 text-center">
            <v-btn
              append-icon="mdi-open-in-new"
              @click="() => ouvrirLien(URL_TÉLÉCHARGEMENTS)"
            >
              {{ t('téléchargements.ouvrir') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </span>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import semver from 'semver';

import CarteTelechargement from './CarteTéléchargement.vue';
import IndiceInstallationApple from './IndiceInstallationApple.vue';
import imgLogo from "@/assets/logo.svg";

import {
  InfoTéléchargement,
  URL_TÉLÉCHARGEMENTS,
  correspExtentions,
  obtTousLesTéléchargements,
  plateforme,
} from '@/utils/téléchargements';
import { கிளிமூக்கை_பயன்படுத்து } from '@lassi-js/kilimukku-vue';
import { ouvrirLien } from '@/utils/utils';

const { mdAndUp } = useDisplay();

const { மொழியாக்கம்_பயன்படுத்து } = கிளிமூக்கை_பயன்படுத்து();
const { $மொ: t } = மொழியாக்கம்_பயன்படுத்து({});

const version = ref<string>();
const se = ref<string>();
const surPlateforme = plateforme();
onMounted(() => {
  if (surPlateforme && ['linux', 'windows', 'mac'].includes(surPlateforme)) {
    se.value = surPlateforme;
  }
});

const disponibles = ref<InfoTéléchargement[]>();
onMounted(async () => {
  disponibles.value = await obtTousLesTéléchargements();
  version.value = disponibles.value
    .sort((a, b) => (semver.gt(a.version, b.version) ? -1 : 1))[0]
    .version.replace(/^v/, '');
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
  return disponibles.value?.filter(
    d =>
      (se.value === 'tous' || d.se === se.value) &&
      (version.value === 'toutes' || d.version.replace(/^v/, '') === version.value),
  );
});
</script>
