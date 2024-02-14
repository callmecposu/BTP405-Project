from flask import request

def addCORS(resp, allowedMethods):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = '*'
    resp.headers['Access-Control-Expose-Headers'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = allowedMethods
    return resp