const Geneartor = require('yeoman-generator')
const path = require('path')
const chalk = require('chalk')

const getDomain = (domain, env = 'dev') => {
  // const [host, ...others] = domain.split('.')
  // return [`${env}-${host}`, ...others].join('.')

  return `${ env }-${ domain }`
}

module.exports = class extends Geneartor {
  prompting() {
    const dirName = path.basename(this.destinationPath())
    const prompts = [
      {
        type:    'input',
        name:    'appName',
        default: dirName,
        message: '请输入项目名称',
      },
      {
        type:    'input',
        name:    'domain',
        message: '请输入生产域名(其他环境将按规则自动适配)',
      },
    ]

    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  }

  install() {
    this.installDependencies({
      npm:   true,
      bower: false,
      yarn:  false,
    })
  }

  writing() {
    const srcDir = path.resolve(__dirname, '../../app')
    this.sourceRoot(srcDir)

    this.spawnCommandSync(`git`, ['init'], {
      cwd: this.destinationPath('./'),
    })

    this.fs.copy(path.resolve(srcDir, '**'), this.destinationPath('./'), {
      globOptions: {
        dot:    true,
        ignore: ['**/dist/**', path.resolve(srcDir, 'package.json')],
      },
    })
    this.fs.write(
      this.destinationPath('./.npmrc'),
      'registry=http://nodepackages.hellobike.cn:4873/'
    )
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore')
    )

    const isPkgExist = this.fs.exists(this.destinationPath('package.json'))

    if (!isPkgExist) {
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          process: contents => {
            const contentStr = contents.toString()
            const { appName, domain } = this.answers

            return contentStr
              .replace(/\{\{appName\}\}/g, appName)
              .replace(/"version":.*/g, '"version": "1.0.0",')
              .replace(/\{\{dev-domain\}\}/g, getDomain(domain, 'dev'))
              .replace(/\{\{fat-domain\}\}/g, getDomain(domain, 'fat'))
              .replace(/\{\{uat-domain\}\}/g, getDomain(domain, 'uat'))
              .replace(/\{\{pro-domain\}\}/g, domain)
          },
        }
      )
    }
  }

  end() {
    this.log('\n', chalk.bold('你可以输入: make dev 来启动开发环境'))
  }
}
