"""Builds glinker-site-prototype.html from src/site.src.html and the SVG assets."""
import re, pathlib
here = pathlib.Path(__file__).parent
def svg(name):
    s = (here / 'assets' / name).read_text(encoding='utf-8')
    s = re.sub(r'<title>.*?</title>', '', s, flags=re.S)
    # one diagram is inlined several times: drop ids, keep data-node as the hook
    s = re.sub(r' id="n-[a-z-]+"', '', s).replace('data-node="', 'data-node="n-')
    return s.strip()
src = (here / 'src' / 'site.src.html').read_text(encoding='utf-8')
sprite = svg('icons.svg').replace('<svg ', '<svg class="sprite" aria-hidden="true" ', 1)
out = (src.replace('<!--@sprite-->', sprite)
          .replace('<!--@wide-->', svg('power-chain-wide.svg'))
          .replace('<!--@tall-->', svg('power-chain-tall.svg')))
(here / 'glinker-site-prototype.html').write_text(out, encoding='utf-8')
print(len(out))
