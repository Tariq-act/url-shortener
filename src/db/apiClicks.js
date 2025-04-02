import supabase from "./supabase";

export async function getClicksForUrl(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error(error.message);
    return new Error("Unable to load Clicks");
  }

  return data;
}
