def load_config(path):
    with open(path, 'r') as conf:
        from yaml import load
        return load(conf)


if __name__ == '__main__':
    import pathlib
    print(load_config(str(pathlib.Path('..') / 'config' / 'app_cfg.yml')))
