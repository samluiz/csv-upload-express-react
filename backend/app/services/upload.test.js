jest.mock('multer', () => {
  const multer = () => ({
    any: () => {
      return (req, res, next) => {
        req.file = {
            fieldname: 'file',
            originalname: 'mock.csv',
            encoding: '7bit',
            mimetype: 'text/csv',
            destination: 'uploads/',
            filename: 'mockfile',
            path: 'uploads',
            size: 177
        }
        return next()
      }
    }
  })
  return multer
})

describe('should test upload service', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should pass', async () => {
    const upload = require('./upload')
    const req = { file: { path: 'uploads' } }
    const res = { json: jest.fn() }
    const next = jest.fn()
    await upload.any()(req, res, next)
    expect(req.file).toBeDefined()
    expect(next).toHaveBeenCalled()
  })
})