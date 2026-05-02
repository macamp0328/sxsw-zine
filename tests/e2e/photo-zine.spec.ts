import { expect, test } from '@playwright/test';

test('homepage renders large contained photos and image overlay works', async ({
  page,
}) => {
  await page.goto('/');

  const firstImageButton = page
    .getByRole('button', { name: /open full size image/i })
    .first();
  await expect(firstImageButton).toBeVisible();

  const viewport = page.viewportSize();
  const box = await firstImageButton.boundingBox();

  expect(viewport).not.toBeNull();
  expect(box).not.toBeNull();
  expect(box!.width).toBeLessThanOrEqual(viewport!.width);
  expect(box!.height).toBeLessThanOrEqual(viewport!.height);

  await firstImageButton.click();
  await expect(
    page.getByRole('dialog', { name: /full size image view/i }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('dialog', { name: /full size image view/i }),
  ).toBeHidden();
});

test('external tracked links keep their native navigation target', async ({
  page,
}) => {
  await page.goto('/');

  const githubLink = page.getByRole('link', { name: /github repository/i });
  await expect(githubLink).toHaveAttribute(
    'href',
    'https://github.com/macamp0328/sxsw-zine',
  );
  await expect(githubLink).toHaveAttribute('target', '_blank');
});
