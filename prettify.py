#!/usr/bin/env python3
import json
json.dump(json.load(open("data.json")), open("data.pretty.json", "w"), indent=2, sort_keys=True)
