<template>
  <span>
    <v-row class="pa-6">
      <v-col :cols="mdAndUp ? 4 : 12" class="pa-6">
        <v-img height="300" src="@/assets/logo.svg" />
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
            Constellation
          </h1>
          <div
            :class="{
              'text-h4': mdAndUp,
              'text-h5': !mdAndUp,
              'font-weight-light': true,
              'mb-n1': true,
            }"
          >
            Le réseau distribué pour les données scientifiques
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="d-flex align-center justify-center pa-6"
      style="background-color: rgb(242, 247, 252)"
    >
      <titre-section
        titre="Pourquoi Constellation ?"
        :sous-titre="[
          'Constellation est un réseau pair-à-pair pour le partage des données scientifiques.',
          'Il vous permet de collecter et de publier les données de vos projets sans utilisation de serveur centralisé.',
        ]"
      />

      <v-col cols="auto">
        <carte-fonctionalite
          titre="Science citoyenne"
          sous-titre="Obtenez des données en directe de vos participants sur le terrain, sans jamais avoir à vous inquiéter d'un serveur."
          :image="imgScienceCitoyenne"
        />
      </v-col>
      <v-col cols="auto">
        <carte-fonctionalite
          titre="Reproductibilité"
          sous-titre="Chacune de vos bases de données est accessible selon un identifiant unique. Il n'y a que vous qui pouvez la modifier."
          :image="imgSécurité"
        />
      </v-col>
      <v-col cols="auto">
        <carte-fonctionalite
          titre="Sécurité"
          sous-titre="Vos données resteront disponibles tant qu'au moins une autre personne sur le réseau s'y intéresse. Même si vous échapez votre thé sur votre ordi."
          :image="imgThé"
        />
      </v-col>
      <v-col cols="auto">
        <carte-fonctionalite
          titre="Intégration en continue"
          sous-titre="Configurez vos analyses en Python, R ou Julia et elles suivront en directe toute mise à jour des bases de données."
          :image="imgCode"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center pa-6">
      <titre-section
        titre="Démarrer"
        :sous-titre="[
          'Vous pouvez utiliser Constellation en ligne, l\'installer sur votre ordinateur, ou bien l\'accéder dans votre langage de programmation favori.',
        ]"
      />
      <v-col cols="auto">
        <v-card
          width="300"
          height="330"
          class="text-center"
          @click="() => ouvrirLien('https://appli.réseau-constellation.ca')"
        >
          <v-card-item class="mt-4">
            <v-card-title class="text-h5 font-weight-bold"
              >Appli en ligne</v-card-title
            >
          </v-card-item>
          <v-card-text>
            <v-img class="my-6" height="100" :src="imgAppliEnLigne" />
            Aucune installation nécessaire. Disponible sur téléphone et
            navigateur (pas de Safari, désolé) !
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
            <v-card-title class="text-h5 font-weight-bold"
              >Installer Constellation</v-card-title
            >
          </v-card-item>
          <v-card-text>
            <v-img class="my-6" height="100" :src="imgInstaller" />
            Pour plus de fonctionnalités et d'indépendance.
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
            <v-card-title class="text-h5 font-weight-bold"
              >Accès programmatique</v-card-title
            >
          </v-card-item>
          <v-card-text>
            <v-img class="my-6" height="100" :src="imgCode" />
            Accéder au réseau Constellation à partir de votre langage de
            programmation favori.
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
            <v-card-title class="text-h5 font-weight-bold"
              >Documentation</v-card-title
            >
          </v-card-item>
          <v-card-text>
            <v-img class="my-6" height="100" :src="imgDocu" />
            Les réponses à toutes vos questions. (Nous l'espérons.)
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
          Nous joindre
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
          <v-icon icon="mdi-account-multiple-outline" size="large" start />

          Communauté
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
          <v-icon icon="mdi-xml" size="large" start />

          Code source
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
          <v-icon icon="mdi-email" size="large" start />
          Courriel
        </v-btn>
      </v-col>
    </v-row>
  </span>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

import CarteFonctionalite from "./CarteFonctionalité.vue";
import TitreSection from "./TitreSection.vue";

import imgCode from "@/assets/undraw/undraw_code_typing_re_p8b9.svg";
import imgThé from "@/assets/undraw/undraw_mint_tea_-7-su0.svg";
import imgSécurité from "@/assets/undraw/undraw_two_factor_authentication_namy.svg";
import imgScienceCitoyenne from "@/assets/undraw/undraw_fall_is_coming_yl-0-x.svg";
import imgDocu from "@/assets/undraw/undraw_book_lover_re_rwjy.svg";
import imgAppliEnLigne from "@/assets/undraw/undraw_browsing_re_eycn.svg";
import imgInstaller from "@/assets/undraw/undraw_data_processing_yrrv.svg";

import { obtLienTéléchargement } from "@/utils/téléchargements";
import { ouvrirLien } from "@/utils/utils";

const { mdAndUp } = useDisplay();

const lienTéléchargementDirecte = ref<string>();
onMounted(async () => {
  lienTéléchargementDirecte.value = await obtLienTéléchargement();
});
</script>
