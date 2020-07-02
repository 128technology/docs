---
title: Contributing
sidebar_label: Contributing
---

## How to contribute

You can help improve our guides or the API reference by making them more coherent, consistent, or readable, adding missing information, correcting factual errors, fixing typos, or bringing them up to date with the latest 128T software.

The 128 Technology documentation website is built using Docusaurus 2 to generate its static content from markdown documents. When editing existing content, or authoring new content, it is best to learn from what already exists - these are the best examples. If you are looking to learn markdown or expand on your knowledge, [GitHub-flavored Markdown syntax](https://docusaurus.io/docs/en/doc-markdown) is a great resource.

Technical writing is different from other styles of writing.  Markus Kazmierczak offers some great tips for how to write copy that is easy to follow where you learn as you go in his [blog](https://mkaz.blog/misc/notes-on-technical-writing/). We do our best to follow these principles throughout our documentation.

### Testing

Before posting a PR for submitting changes, it is best to first test your changes locally to ensure that all links, references and formatting appear the way you expect.  Have a look at the [README](https://github.com/128technology/docs) for instructions on how to test locally.

### Submitting Changes

1. Create a branch (typically based off of `master`) on the [docs GitHub page](https://github.com/128technology/docs).
![Creating a branch from master](/img/contributing_creating_branches.png)
2. On the machine where you are making your changes locally, update your repo to get the branch you just created.
    ```
    git fetch origin
    ```
3. Checkout the branch you just created
    ```
    git co <branch>
    ```
4. Make your changes.
5. Commit your changes.
    ```
    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."
    ```
6. Push your changes upstream
    ```
    git push origin <branch>
    ```
7. Open a [Pull Request](https://github.com/128technology/docs/pulls) from your branch with a clear list of what you've done. Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:
![Creating a PR](/img/contributing_creating_pr.png)
8. Once the PR has been merged, the branch will be automatically deleted from origin (online). It is likely that you no longer need your local branch anymore.  Remove your local branch:
    ```
    git branch -d <branch>
    ```

## Issues

### Did you find something wrong?

Did you find a typo or something that was incorrect and do not have the time to submit a PR yourself?  Do you have suggestions for new content? That's okay, we'll get to it.  Have a look at our [Issues](https://github.com/128technology/docs/issues) page first to see if someone else has already reported the same issue. When filling out an issue, please do your best to provide as much detail as possible.  We want to make sure that we are providing the highest quality documentation to you as possible.

### Did you write your own patch and want to submit the changes?

* Open a new pull request with the patch.
* Ensure the PR description clearly describes the changes as accurately as possible.
* Your changes will be merged in and published once they have been reviewed and passes all CI tests.

## Guidelines

### Hyperlinks

Docusaurus is particular about how internal links are defined within the markdown in order to provide maximum browser support. While multiple formats are allowed, in practice only one approach has proven to provide the best results.
* External links require a full URL, including the scheme. `[External Link](https://github.com/128technology/docs/pulls)`
* Links to images, or other static content start with a exclamation point `!` and require a relative path within the static directory. `![Image Description](/img/some_image.png)`
* Links to resources within the site must contain the markdown file's extension (most often this is .md, but sometimes can be .mdx). `[link to another file](another_file.md)`
* Links to headers within the same file should contain a reference to the header only. `[header link](#internal-header)`
  :::tip
  Header links can be tricky to determine as Docusaurus removes case and adds hypens instead of special characters. Click on the header you are interested in linking. Go to the browser URL and copy the value and paste it into your markdown file.
  :::
* Links to headers within another file require both the file name and extension, plus the header. `[Link to a header within another file](another_file.md#header)`

### Datamodel References

When referring to paths in datamodel hierarcies, it is preferable to use a single right angle bracket to separate levels in the path.  For example: `authority > router > system > ntp`.  Even though `router` is a multi-instance leaf node in YANG and technically requires a key to refer to a specific instance, the instance ID is left out for brevity.

* When referring to specific instances of a configuration value, the object in discussion should be called out as code by using backtics (e.g. `service-policy`)
* When referring to a data model concept, it should be called in italicized format (e.g. _service-policy_)

### Markdown Headers

The right-hand table of contents is generated from `## heading 2` and `### heading 3`.  Headings `# heading 1` or `#### header 4` and higher are excluded. Keep this in mind when organizing your content. Use this to your advantage in how you want information to appear.

### Callouts/admonitions

In addition to the basic Markdown syntax, we use [remark-admonitions](https://github.com/elviswolcott/remark-admonitions) alongside MDX to add support for admonitions. Admonitions are wrapped by a set of 3 colons.

The default keywords are `important`, `tip`, `note`, `warning`, and `danger`. Aliases for `info` => `important`, `success` => `tip`, `secondary` => `note` and `danger` =>`warning` also exist.

Example:
```
:::note
The content and title *can* include markdown.
:::

:::tip You can specify an optional title
Heads up! Here's a pro-tip.
:::

:::info
Useful information.
:::

:::caution
Warning! You better pay attention!
:::

:::danger
Danger danger, mayday!
:::
```
:::note
The content and title *can* include markdown.
:::

:::tip You can specify an optional title
Heads up! Here's a pro-tip.
:::

:::info
Useful information.
:::

:::caution
Warning! You better pay attention!
:::

:::danger
Danger danger, mayday!
:::

### Sidebar

The content listed in the left-hand table of contents is _not_ automatically generated and is govered by the file `sidebars.js`. If you are adding new files, be sure to add it to this file as well. Release notes should always be ordered from newest to oldest.