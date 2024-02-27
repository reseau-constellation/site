import axios from "axios";
import platform from "platform";
import semver from "semver";

const extentionCompatible = (ext: string): boolean => {
    if (platform.os?.family?.includes("Ubuntu")) {
      return ext === 'AppImage';
    } else if (platform.os?.family?.includes("OS X")) {
      return ext === 'dmg';
    } else if (platform.os?.family?.includes("Windows")) {
      return ext === 'exe';
    } else {
      return false;
    }
};

export const plateforme = (): "windows" | "mac" | "ubuntu" | "téléphoneOuTablette" | undefined=> {
  if (platform.os?.family?.includes("Ubuntu")) {
    return "ubuntu";
  } else if (platform.os?.family?.includes("OS X")) {
    return "mac";
  } else if (platform.os?.family?.includes("Windows")) {
    return 'windows';
  } else if (platform.os?.family! in ["Android", "iOS", "Windows Phone"]){
    return 'téléphoneOuTablette';
  } 
}

export const surOrdi = () => {
  const so = plateforme()
  return so && so in ["windows", "mac" , "ubuntu"]
}

export type auteurGitHub = {
login: string;
id: number;
node_id: string;
avatar_url: string;
gravatar_id: string;
url: string;
html_url: string;
followers_url: string;
following_url: string;
gists_url: string;
starred_url: string;
subscriptions_url: string;
organizations_url: string;
repos_url: string;
events_url: string;
received_events_url: string;
type: string;
site_admin: boolean;
};
export type fichierPublicationGitHub = {
url: string;
browser_download_url: string;
id: number;
node_id: string;
name: string;
label: string;
state: string;
content_type: string;
size: number;
download_count: number;
created_at: number;
updated_at: number;
uploader: auteurGitHub;
};
  
type publicationGitHub = {
    url: string;
    html_url: string;
    assets_url: string;
    upload_url: string;
    tarball_url: string;
    zipball_url: string;
    discussion_url: string;
    id: number;
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: string;
    body: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    author: auteurGitHub;
    assets: fichierPublicationGitHub[];
  };

export const obtLienTéléchargement = async (): Promise<string|undefined> => {
  const jsonTéléchargements = (await axios.get("https://api.github.com/repos/reseau-constellation/iug/releases")).data as publicationGitHub[];
  let versionPlusRécente: string | undefined = undefined;
  let urlTéléchargement: string | undefined = undefined;
  for (const t of jsonTéléchargements) {
    const version = t.name;
    if (!versionPlusRécente || semver.gt(version, versionPlusRécente)) {
      for (const fichier of t.assets) {
        const ext = fichier.name.split('.').pop();
        if (ext && extentionCompatible(ext)) {
          versionPlusRécente = version;
          urlTéléchargement = fichier.browser_download_url;
        }
      }
    }
  }
  return urlTéléchargement;
}
