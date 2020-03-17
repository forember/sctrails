#!/usr/bin/env python3
import json
import re

length_re = re.compile(r'^\s*([0-9.]+)\s*miles\s*$')
difficulties = ["Easy", "Moderate", "Difficult", "Strenuous"]

def print_json(obj):
  print(json.dumps(obj, indent=2, sort_keys=True))

trails = json.load(open('data.json'))
for trail in trails:
  trail['length'] = float(length_re.match(trail['length']).group(1))
  trail['difficulty'] = difficulties.index(trail['difficulty'])

results = []
for trail in trails:
  if 'Hike' in trail['activities'] and trail['length'] > 2 and trail['difficulty'] > 1:
    results.append(trail)

results.sort(key=lambda t: t['length'], reverse=True)
print_json(results)
