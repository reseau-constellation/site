<template>
  <span>
    <v-row class="pa-6">
      <v-col
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
              'text-h2': !mdAndUp,
              'font-weight-bold': true,
            }"
          >
            {{ t('principale.titre') }}
          </h1>
          <div
            :class="{
              'text-h4': mdAndUp,
              'text-h5': !mdAndUp,
              'font-weight-light': true,
              'mb-n1': true,
            }"
          >
            {{ t('principale.sousTitre') }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="d-flex align-center justify-center pa-6"
      style="background-color: rgb(242, 247, 252)"
    >
      <titre-section
        :titre="t('principale.pourquoi.titre')"
        :sous-titre="[t('principale.pourquoi.sousTitre1'), t('principale.pourquoi.sousTitre2')]"
      />

      <v-col cols="auto">
        <carte-fonctionalite
          :titre="t('principale.pourquoi.parceque.scienceCitoyenne.titre')"
          :sous-titre="t('principale.pourquoi.parceque.scienceCitoyenne.sousTitre')"
          :image="imgScienceCitoyenne"
        />
      </v-col>
      <v-col cols="auto">
        <carte-fonctionalite
          :titre="t('principale.pourquoi.parceque.reproductibilité.titre')"
          :sous-titre="t('principale.pourquoi.parceque.reproductibilité.sousTitre')"
          :image="imgSécurité"
        />
      </v-col>
      <v-col cols="auto">
        <carte-fonctionalite
          :titre="t('principale.pourquoi.parceque.sécurité.titre')"
          :sous-titre="t('principale.pourquoi.parceque.sécurité.sousTitre')"
          :image="imgThé"
        />
      </v-col>
      <v-col cols="auto">
        <carte-fonctionalite
          :titre="t('principale.pourquoi.parceque.intégration.titre')"
          :sous-titre="t('principale.pourquoi.parceque.intégration.sousTitre')"
          :image="imgCode"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center pa-6">
      <titre-section
        :titre="t('principale.démarrer.titre')"
        :sous-titre="[t('principale.démarrer.sousTitre')]"
      />
      <v-col cols="auto">
        <v-card
          width="300"
          height="330"
          class="text-center"
          @click="() => ouvrirLien(lienAppli)"
        >
          <v-card-item class="mt-4">
            <v-card-title class="text-h5 font-weight-bold">{{
              t('principale.démarrer.comment.enLigne.titre')
            }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <v-img
              class="my-6"
              height="100"
              :src="imgAppliEnLigne"
            />
            {{ t('principale.démarrer.comment.enLigne.sousTitre') }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card
          width="300"
          height="330"
          class="text-center"
          @click="
            async () =>
              lienTéléchargementDirecte
                ? ouvrirLien(lienTéléchargementDirecte)
                : $router.push(encodeURI('/téléchargements'))
          "
        >
          <v-card-item class="mt-4">
            <v-card-title class="text-h5 font-weight-bold">{{
              t('principale.démarrer.comment.installer.titre')
            }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <v-img
              class="my-6"
              height="100"
              :src="imgInstaller"
            />
            {{ t('principale.démarrer.comment.installer.sousTitre') }}
            <v-btn v-show="lienTéléchargementDirecte" class="mt-4" variant="outlined" :append-icon="isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right'" @click.stop="() => routeur.push(encodeURI('/téléchargements'))">{{ t('principale.démarrer.comment.installer.btn') }}</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card
          width="300"
          height="330"
          class="text-center"
          @click="
            () =>
              ouvrirLien(
                'https://docu.réseau-constellation.ca/avancé/autresLangages/introduction.html',
              )
          "
        >
          <v-card-item class="mt-4">
            <v-card-title class="text-h5 font-weight-bold">{{
              t('principale.démarrer.comment.programme.titre')
            }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <v-img
              class="my-6"
              height="100"
              :src="imgCode"
            />
            {{ t('principale.démarrer.comment.programme.sousTitre') }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card
          width="300"
          height="330"
          class="text-center"
          @click="() => ouvrirLien('https://docu.réseau-constellation.ca')"
        >
          <v-card-item class="mt-4">
            <v-card-title class="text-h5 font-weight-bold">{{
              t('principale.démarrer.comment.docu.titre')
            }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <v-img
              class="my-6"
              height="100"
              :src="imgDocu"
            />
            {{ t('principale.démarrer.comment.docu.sousTitre') }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="d-flex align-center justify-center pa-6"
      style="background-color: rgb(242, 247, 252)"
    >
      <v-col cols="12"
        ><h1 class="text-h3 font-weight-bold text-center">
          {{ t('principale.joindre.titre') }}
        </h1></v-col
      >
      <v-col cols="auto">
        <v-btn
          href="https://matrix.to/#/!poDYzupTbvLiBsnQSr:matrix.org?via=matrix.org"
          min-width="164"
          rel="noopener noreferrer"
          target="_blank"
          variant="text"
        >
          <v-icon
            icon="mdi-account-multiple-outline"
            size="large"
            start
          />

          {{ t('principale.joindre.par.communauté') }}
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          color="primary"
          href="https://github.com/reseau-constellation"
          min-width="228"
          rel="noopener noreferrer"
          size="x-large"
          target="_blank"
          variant="outlined"
        >
          <v-icon
            icon="mdi-xml"
            size="large"
            start
          />

          {{ t('principale.joindre.par.codeSource') }}
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          href="mailto:julien.malard@mail.mcgill.ca"
          min-width="164"
          rel="noopener noreferrer"
          target="_blank"
          variant="text"
        >
          <v-icon
            icon="mdi-email"
            size="large"
            start
          />
          {{ t('principale.joindre.par.courriel') }}
        </v-btn>
      </v-col>
    </v-row>
  </span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useDisplay, useRtl } from 'vuetify';
import { useRouter } from 'vue-router';

import { கிளிமூக்கை_பயன்படுத்து, மொழிகளைப்_பயன்படுத்து } from '@lassi-js/kilimukku-vue';

import CarteFonctionalite from './CarteFonctionalité.vue';
import TitreSection from './TitreSection.vue';

import imgCode from '@/assets/undraw/undraw_code_typing_re_p8b9.svg';
import imgThé from '@/assets/undraw/undraw_mint_tea_-7-su0.svg';
import imgSécurité from '@/assets/undraw/undraw_two_factor_authentication_namy.svg';
import imgScienceCitoyenne from '@/assets/undraw/undraw_fall_is_coming_yl-0-x.svg';
import imgDocu from '@/assets/undraw/undraw_book_lover_re_rwjy.svg';
import imgAppliEnLigne from '@/assets/undraw/undraw_browsing_re_eycn.svg';
import imgInstaller from '@/assets/undraw/undraw_data_processing_yrrv.svg';
import imgLogo from "@/assets/logo.svg";

import { obtLienTéléchargement } from '@/utils/téléchargements';
import { ouvrirLien } from '@/utils/utils';

const { mdAndUp } = useDisplay();
const { isRtl } = useRtl();
const routeur = useRouter();

const { மொழியாக்கம்_பயன்படுத்து } = கிளிமூக்கை_பயன்படுத்து();
const { $மொ: t } = மொழியாக்கம்_பயன்படுத்து({});
const { மொழி } = மொழிகளைப்_பயன்படுத்து();

const lienAppli = computed(() => {
  return `https://appli.réseau-constellation.ca/#/?lg=${மொழி.value}`;
});

const lienTéléchargementDirecte = ref<string>();
onMounted(async () => {
  lienTéléchargementDirecte.value = await obtLienTéléchargement();
});
</script>
