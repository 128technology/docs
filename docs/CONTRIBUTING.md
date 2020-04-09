---
title: Contributing
sidebar_label: Contributing
---

## How to contribute
You can help improve our guides or the API reference by making them more coherent, consistent, or readable, adding missing information, correcting factual errors, fixing typos, or bringing them up to date with the latest 128T software.

The 128 Technology documentation website is built using Docusaurus 2 to generate its static content from markdown documents. When editing existing content, or authoring new content, it is best to learn from what already exists - these are the best examples. If you are looking to learn markdown or expand on your knowledge, [GitHub-flavored Markdown syntax](https://docusaurus.io/docs/en/doc-markdown) is a great resource.

Technical writing is different from other styles of writing.  Markus Kazmierczak offers some great tips for how to write copy that is easy to follow where you learn as you go in his [blog](https://mkaz.blog/misc/notes-on-technical-writing/). We do our best to follow these principles thoughout our documentation.

### Testing
Before posting a PR for submitting changes, it is best to first test your changes locally to ensure that all links, references and formatting appear the way you expect.  Have a look at the [README](https://github.com/128technology/docs) for instructions on how to test locally.

### Submitting changes
Please open a [Pull Request](https://github.com/128technology/docs/pulls) with a clear list of what you've done. Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."

## Issues
### Did you find something wrong?
Did you find a typo or something that was incorrect and do not have the time to submit a PR yourself?  Do you have suggestions for new content? That's okay, we'll get to it.  Have a look at our [Issues](https://github.com/128technology/docs/issues) page first to see if someone else has already reported the same issue. When filling out an issue, please do your best to provide as much detail as possible.  We want to make sure that we are providing the highest quality documentation to you as possible.

### Did you write your own patch and want to submit the changes?
* Open a new pull request with the patch.
* Ensure the PR description clearly describes the changes as accurately as possible.
* Your changes will be merged in and published once they have been reviewed and passes all CI tests.

## Guidelines

### Datamodel References
When referring to paths in datamodel hierarcies, it is preferable to use a single right angle bracket to separate levels in the path.  For example: `authority > router > system > ntp`.  Even though `router` is a multi-instance leaf node in YANG and technically requires a key to refer to a specific instance, the instance ID is left out for brevity.

* When referring to specific instances of a configuration value, the object in discussion should be called out as code by using backtics (e.g. `service-policy`)
* When referring to a data model concept, it should be called in italicized format (e.g. _service-policy_)

## Markdown Headers
The right-hand table of contents is generated from `## heading 2` and `### heading 3`.  Headings `# heading 1` or `#### header 4` and higher are excluded. Keep this in mind when organizing your content. Use this to your advantage in how you want information to appear.