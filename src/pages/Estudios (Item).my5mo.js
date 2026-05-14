import wixStorage from 'wix-storage';

$w.onReady(() => {
  const item = $w("#dynamicDataset").getCurrentItem();

  if (!item) return;

  wixStorage.session.setItem("prevSlug", item.slug);
  wixStorage.session.setItem("prevCollection", $w("#dynamicDataset").getDatasetName());
});
