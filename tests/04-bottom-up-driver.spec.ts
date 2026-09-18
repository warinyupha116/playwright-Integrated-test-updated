import {
  test,
  expect,
  BrowserContext,
  Page,
} from '@playwright/test';

// =====================================================
// DRIVER A
// ทำหน้าที่แทน Login Layer ด้านบน
// ไม่กรอก username/password ผ่านหน้า Login
// =====================================================
async function driverOpenInventory(
  context: BrowserContext
): Promise<Page> {
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);

  const page = await context.newPage();
  // เปิดไปยัง cart.html ตามโค้ดของคุณ
  await page.goto('https://www.saucedemo.com/cart.html');
  return page;
}

test('Bottom-Up DRIVER: Driver A -> cart.html Stub', async ({ browser }) => {
  const context = await browser.newContext();

  try {
    // ===================================================
    // Driver A เรียก Layer ด้านล่าง
    // ===================================================
    const page = await driverOpenInventory(context);

    // ===================================================
    // แก้ไขเฉพาะส่วน cart.html ( Stub B ) ตามโจทย์
    // เพิ่มชื่อ-นามสกุล ตัวเองเข้าไปใน cart.html stub
    // ===================================================
    await page.setContent(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cart Stub</title>
        </head>
        <body>
          <h1>Cart Inventory Card</h1>
          <div class="inventory_list" data-test="stub-inventory">
            warinyupha sonumka
          </div>
        </body>
      </html>
    `);

    // ===================================================
    // เขียนการทดสอบ (Assert) ว่ามีชื่อและนามสกุลหรือไม่
    // ===================================================
    await expect(
      page.locator('[data-test="stub-inventory"]')
    ).toBeVisible();

    await expect(
      page.locator('[data-test="stub-inventory"]')
    ).toContainText('warinyupha sonumka');

  } finally {
    await context.close();
  }
});