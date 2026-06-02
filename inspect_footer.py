from pathlib import Path
text = Path('index.html').read_text(encoding='utf-8')
start = text.find('container footer-top')
end = text.find('footer-bottom')
print('start:', start, 'end:', end)
print(text[start-60:end+60])
