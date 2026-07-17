# WordPress import

The importer reads the ignored `context/blog.sql` dump and the ignored
`context/wp-content/uploads/` tree. It preserves published post HTML and the
legacy `/%year%/%monthnum%/%postname%.html` permalink format.

```sh
npm run import:wordpress
```

The pipeline has three deterministic stages:

- `import:wordpress:data` parses the MySQL dump, writes
  `src/_data/wordpressPosts.json`, rewrites obsolete internal URLs, and writes
  the referenced-media manifest.
- `import:wordpress:media` copies only manifest-referenced files into
  `src/assets/blog/` while preserving upload paths and timestamps. It also
  vendors the one externally embedded image asset recorded in the manifest.
- `import:wordpress:validate` tests the SQL and URL parsers, verifies exactly
  194 unique legacy permalinks, rejects legacy hosts, and checks every local
  media copy against its source byte size.

Re-running the pipeline is safe. Unchanged media files are not copied again.
