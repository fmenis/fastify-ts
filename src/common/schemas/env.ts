import S from 'fluent-json-schema'

export function sEnv() {
  return S.object()
    .additionalProperties(false)
    .prop(
      'NODE_ENV',
      S.string().enum(['production', 'staging', 'development']).required()
    )
    .prop('SERVER_ADDRESS', S.string().default('127.0.0.1'))
    .prop('SERVER_PORT', S.string().default('3000'))
    .prop('LOG_LEVEL', S.string().required())
}
