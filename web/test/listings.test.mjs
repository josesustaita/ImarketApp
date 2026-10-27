import test from "node:test";
import assert from "node:assert/strict";
import {
  initialListings,
  filterListings,
  createListing,
  readSaved,
  restoreListings,
} from "../src/listings.mjs";
test("search, category, and saved filters combine", () => {
  assert.equal(
    filterListings(initialListings, "guitar", "Music", true, ["guitar"])[0].id,
    "guitar",
  );
  assert.equal(filterListings(initialListings, "guitar", "Home").length, 0);
});
test("new listings validate price, title, and category", () => {
  for (const price of [-1, NaN, Infinity, 10001])
    assert.throws(() =>
      createListing({ title: "Nice chair", price, category: "Home" }, "new"),
    );
  assert.throws(() =>
    createListing({ title: "", price: 20, category: "Home" }, "new"),
  );
  assert.throws(() =>
    createListing({ title: "Chair", price: 20, category: "missing" }, "new"),
  );
});
test("a valid demo listing becomes a searchable find", () => {
  const item = createListing(
    { title: "  My guitar  ", price: "45", category: "Music" },
    "new",
  );
  assert.equal(item.seller, "You");
  assert.equal(filterListings([item], "guitar", "Music").length, 1);
});
test("corrupt or non-array saved storage falls back gracefully", () => {
  assert.deepEqual(readSaved({ getItem: () => "{broken" }, "saved", []), []);
  assert.deepEqual(readSaved({ getItem: () => '{"id":1}' }, "saved", []), []);
});

test("restored listings are sanitized and duplicate IDs are ignored", () => {
  const storage = {
    getItem: () =>
      JSON.stringify([
        {
          id: "local-1",
          title: "Chair",
          price: 20,
          category: "Home",
          seller: { bad: true },
          description: { bad: true },
        },
        { id: "local-1", title: "Duplicate", price: 20, category: "Home" },
        { id: "local-bad", title: "", price: -1, category: "Home" },
      ]),
  };
  const items = restoreListings(storage);
  assert.equal(items.length, 1);
  assert.equal(items[0].seller, "You");
  assert.equal(typeof items[0].description, "string");
});
