#!/usr/bin/env python3.9

"""
OBJECTIVE:
The script will convert our docusaurus mdx format files to dita format files to assist in the conversion process to Juniper docs.

PRE-REQUISITES:
# python3.9 -m pip install markdown python-frontmatter beautifulsoup4
"""

import markdown
import frontmatter
from bs4 import BeautifulSoup
import re
import argparse
import logging
import pathlib
LOG = logging.getLogger(__name__)

def main(args):
    """Main entry point for the script."""
    logging.basicConfig(level=logging.DEBUG if args.debug else logging.INFO)

    input_path = pathlib.Path(args.input)
    if args.output:
        output_path = pathlib.Path(args.output)
    else:
        output_path = input_path.with_suffix('.dita')

    md_content = input_path.read_text()
    dita_xml = md_to_dita(md_content)
    output_path.write_text(dita_xml)
    LOG.info(f"Converted {input_path} to {output_path}")


def md_to_dita(md_content):
    # Parse frontmatter metadata
    post = frontmatter.loads(md_content)
    title = post.metadata.get("title", "Untitled")
    shortdesc = post.metadata.get("description", "")

    # Convert markdown to HTML
    md_converter = markdown.Markdown(extensions=["fenced_code", "tables"])
    LOG.debug(f"Markdown:\n{md_converter}")

    html_content = md_converter.convert(post.content)
    # LOG.debug(f"Converted markdown to HTML:\n{html_content}")

    # Parse HTML to extract structured elements
    soup = BeautifulSoup(html_content, "html.parser")
    dita_topics = convert_html_to_dita(soup, title, shortdesc)

    return wrap_in_dita_document(dita_topics)

def convert_html_to_dita(soup, main_title, main_desc):
    """Converts parsed HTML content to DITA XML format with multiple topics while preserving paragraph structure and interleaving notes."""
    dita_topics = []
    topic_id = slugify(main_title)
    topic_title = main_title
    topic_body = []

    for tag in soup.contents:
        if tag.name in ["h1", "h2", "h3"]:
            if topic_body:
                dita_topics.append(build_dita_topic(topic_id, topic_title, main_desc, "\n".join(topic_body)))
            topic_id = slugify(tag.text)
            topic_title = tag.text
            topic_body = []
        elif tag.name == "p":
            topic_body.append(f"<p>{process_links(tag)}</p>")
        elif tag.name in ["ul", "ol"]:
            list_type = "ul" if tag.name == "ul" else "ol"
            topic_body.append(f"<{list_type}>" + ''.join(f"<li>{li.text}</li>" for li in tag.find_all("li")) + f"</{list_type}>")
        elif tag.name == "blockquote":
            topic_body.append(f"<note><p>{tag.text}</p></note>")
        elif tag.name == "code":
            topic_body.append(f"<codeblock>{tag.text}</codeblock>")
        elif tag.name == "div" and "note" in tag.get("class", []):
            note_content = " ".join(str(process_links(p)) for p in tag.find_all("p"))
            topic_body.append(f"<note><p>{note_content}</p></note>")

    if topic_body:
        dita_topics.append(build_dita_topic(topic_id, topic_title, main_desc, "\n".join(topic_body)))

    return "\n".join(dita_topics)

def build_dita_topic(topic_id, title, shortdesc, body):
    """Creates a DITA topic structure."""
    return f'''<topic xmlns:ditaarch="http://dita.oasis-open.org/architecture/2005/" id="{topic_id}" xml:lang="en-US">
  <title>{title}</title>
  <shortdesc>{shortdesc}</shortdesc>
  <body>
    {body}
  </body>
</topic>'''

def process_links(tag):
    """Recursively process links within paragraphs."""
    for a in tag.find_all("a"):
        href = a['href']
        if "#" in href:  # Handle in-document links
            file_link, anchor = href.split("#", 1)
            a.replace_with(f"<xref href='{file_link}' format='dita' scope='local' xtrf='#{anchor}'>{a.text}</xref>")
        else:
            a.replace_with(f"<xref href='{href}'>{a.text}</xref>")
    return tag.text

def wrap_in_dita_document(dita_topics):
    """Wraps all DITA topics in a single DITA document with one XML declaration."""
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic PUBLIC "-//OASIS//DTD DITA Topic//EN" "/SysSchema/dita13/dtd/technicalContent/dtd/topic.dtd">
<dita>
{dita_topics}
</dita>'''

def slugify(text):
    """Creates a slug from a title."""
    return re.sub(r'[^a-zA-Z0-9]+', '-', text.lower()).strip('-')

def _parse_args():
    parser = argparse.ArgumentParser(
        description="Scan MIST config for various config elements"
    )
    parser.add_argument("--input", "-i", help="Input file path", required=True)
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument(
        "--debug", help="turn on debug mode", action="store_true", default=False
    )
    return parser.parse_known_args()[0]


if __name__ == "__main__":
    main(_parse_args())
