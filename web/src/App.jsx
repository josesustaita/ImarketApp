import { useEffect, useRef, useState } from "react";
import ItemArt from "./ItemArt";
import {
  categories,
  initialListings,
  filterListings,
  createListing,
  readSaved,
  restoreListings,
} from "./listings.mjs";
const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
export default function App() {
  const [listings, setListings] = useState(initialListings),
    [saved, setSaved] = useState([]),
    [ready, setReady] = useState(false),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("All finds"),
    [savedOnly, setSavedOnly] = useState(false),
    [selected, setSelected] = useState(null),
    [formError, setFormError] = useState(""),
    [notice, setNotice] = useState("");
  const details = useRef(null),
    post = useRef(null);
  useEffect(() => {
    try {
      setListings([...initialListings, ...restoreListings(localStorage)]);
      setSaved(
        readSaved(localStorage, "imarket-saved", []).filter(
          (i) => typeof i === "string",
        ),
      );
    } catch {
      setNotice(
        "Your browser is using session-only storage. Changes last for this visit.",
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("imarket-saved", JSON.stringify(saved));
        localStorage.setItem(
          "imarket-listings",
          JSON.stringify(
            listings.filter((i) => !initialListings.some((x) => x.id === i.id)),
          ),
        );
      } catch {
        setNotice(
          "Your browser could not save these changes. They will last for this visit.",
        );
      }
    }
  }, [listings, saved, ready]);
  function toggle(id) {
    setSaved((items) =>
      items.includes(id) ? items.filter((x) => x !== id) : [...items, id],
    );
  }
  function show(item) {
    setSelected(item);
    details.current.showModal();
  }
  function submit(e) {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const item = createListing(data, `local-${crypto.randomUUID()}`);
      setListings((items) => [...items, item]);
      setQuery("");
      setCategory("All finds");
      setSavedOnly(false);
      setNotice(
        `Your demo listing “${item.title}” is ready. It stays on this device.`,
      );
      e.currentTarget.reset();
      post.current.close();
    } catch (err) {
      setFormError(err.message);
    }
  }
  const visible = filterListings(listings, query, category, savedOnly, saved);
  return (
    <main className="shell">
      <header className="nav">
        <a className="brand" href="/">
          i<span>market</span>
          <i aria-hidden="true">✦</i>
        </a>
        <span className="location">⌁ Inspired by Immokalee, FL</span>
        <button
          className="post-button"
          onClick={() => {
            setFormError("");
            post.current.showModal();
          }}
        >
          + List a little treasure
        </button>
      </header>
      <section className="hero">
        <div>
          <p className="eyebrow">GOOD FINDS. FRESH STARTS.</p>
          <h1>
            Someone's once-loved.
            <br />
            <em>Your next favorite.</em>
          </h1>
          <p>
            A little neighborhood magic. Discover lost treasure,
            <br className="desktop-br" /> make some space, and keep good things
            going.
          </p>
          <a className="browse-link" href="#finds">
            Find your next favorite <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-circle" />
          <div className="floating-tag">a second life looks good on you ✦</div>
          <div className="hero-chair">
            <ItemArt type="chair" />
          </div>
          <span className="spark s1">✦</span>
          <span className="spark s2">✧</span>
        </div>
      </section>
      <div className="demo-note">
        <span>✳</span> Neighborhood demo · sample finds and your own listings
        stay on this device.
      </div>
      <section id="finds" className="finds">
        <div className="section-top">
          <div>
            <p className="eyebrow">THE GOOD STUFF</p>
            <h2>
              {savedOnly
                ? "Your little treasure chest."
                : "Fresh finds, familiar streets."}
            </h2>
          </div>
          <button
            className="saved-filter"
            aria-pressed={savedOnly}
            onClick={() => setSavedOnly((x) => !x)}
          >
            {savedOnly ? "♥ Saved finds" : "♡ Saved finds"}{" "}
            <span>{saved.length}</span>
          </button>
        </div>
        <div className="tools">
          <div className="categories" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="search">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <span className="sr-only">Search finds</span>
            <input
              type="search"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="notice" role="status">
          {notice}
        </p>
        <div className="grid">
          {visible.map((item, index) => (
            <article
              className="listing"
              key={item.id}
              style={{ "--delay": `${Math.min(index, 8) * 45}ms` }}
            >
              <div className="item-visual" style={{ background: item.color }}>
                <button
                  className="art-button"
                  aria-label={`View ${item.title}`}
                  onClick={() => show(item)}
                >
                  <ItemArt type={item.art} />
                </button>
                <button
                  className="heart"
                  aria-pressed={saved.includes(item.id)}
                  aria-label={`${saved.includes(item.id) ? "Unsave" : "Save"} ${item.title}`}
                  onClick={() => toggle(item.id)}
                >
                  {saved.includes(item.id) ? "♥" : "♡"}
                </button>
                <span className="condition">{item.condition}</span>
              </div>
              <div className="listing-copy">
                <span className="item-category">{item.category}</span>
                <h3>
                  <button onClick={() => show(item)}>{item.title}</button>
                </h3>
                <div className="item-bottom">
                  <span>{formatPrice.format(item.price)}</span>
                  <span>
                    {item.seller === "You"
                      ? "Your demo listing"
                      : "Neighborhood sample"}{" "}
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && (
          <div className="empty">
            <span aria-hidden="true">♧</span>
            <h3>A little room for discovery.</h3>
            <p>
              {savedOnly
                ? "Save a find with the heart to keep it here."
                : "Try another search or category."}
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All finds");
                setSavedOnly(false);
              }}
            >
              Explore all finds ↗
            </button>
          </div>
        )}
        <p className="count" aria-live="polite">
          {visible.length} little{" "}
          {visible.length === 1 ? "treasure" : "treasures"} to discover
        </p>
      </section>
      <footer>
        <span>Good things deserve another chapter.</span>
        <span>Built by Jose Sustaita ✦</span>
      </footer>
      <dialog ref={details} className="detail-dialog">
        <button
          className="close"
          aria-label="Close listing details"
          onClick={() => details.current.close()}
        >
          ×
        </button>
        {selected && (
          <>
            <div className="detail-art" style={{ background: selected.color }}>
              <ItemArt type={selected.art} />
            </div>
            <p className="eyebrow">
              {selected.category} · {selected.condition}
            </p>
            <h2>{selected.title}</h2>
            <p className="detail-price">{formatPrice.format(selected.price)}</p>
            <p>{selected.description}</p>
            <p className="demo-explainer">
              Demo listing by {selected.seller}. No purchases or seller messages
              are sent.
            </p>
            <button className="primary" onClick={() => toggle(selected.id)}>
              {saved.includes(selected.id)
                ? "♥ Saved to your finds"
                : "♡ Save this find"}
            </button>
          </>
        )}
      </dialog>
      <dialog ref={post} className="post-dialog">
        <button
          className="close"
          aria-label="Close new listing"
          onClick={() => post.current.close()}
        >
          ×
        </button>
        <p className="eyebrow">MAKE ROOM FOR THE NEXT CHAPTER</p>
        <h2>Got a little treasure?</h2>
        <p>Create a demo listing. It stays in this browser.</p>
        <form onSubmit={submit}>
          <label>
            Title
            <input
              name="title"
              required
              maxLength="80"
              placeholder="A chair with a story"
            />
          </label>
          <div className="form-row">
            <label>
              Price ($)
              <input
                name="price"
                type="number"
                required
                min="1"
                max="10000"
                step="0.01"
                placeholder="25"
              />
            </label>
            <label>
              Category
              <select name="category">
                {categories.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            A little about it
            <textarea
              name="description"
              maxLength="500"
              rows="3"
              placeholder="What's its story?"
            />
          </label>
          {formError && <p role="alert">{formError}</p>}
          <button className="primary" type="submit">
            Give it a second chapter ↗
          </button>
        </form>
      </dialog>
    </main>
  );
}
