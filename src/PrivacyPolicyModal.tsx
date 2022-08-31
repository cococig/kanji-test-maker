import {
  Button,
  //Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PrivacyPolicyModal: React.FC<Props> = (props) => {
  const modalSize = useBreakpointValue(["xs", "md", "4xl"]);
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      scrollBehavior="inside"
      size={modalSize}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>プライバシーポリシー</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text as={"h1"} fontSize={"xl"}>
            基本方針
          </Text>
          <Text fontSize={"md"}>
            当サイトは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            適用範囲
          </Text>
          <Text fontSize={"md"}>
            本プライバシーポリシーは、お客様の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            個人情報の利用目的
          </Text>
          <Text fontSize={"md"}>
            当サイトは、お客様からご提供いただく情報を以下の目的の範囲内において利用します。
          </Text>
          <UnorderedList>
            <ListItem>ご本人確認のため</ListItem>
            <ListItem>お問い合わせ、コメント等の確認・回答のため</ListItem>
            <ListItem>各種お知らせ等の配信・送付のため</ListItem>
            <ListItem>キャンペーン・アンケート・モニター・取材等の実施のため</ListItem>
            <ListItem>サービスの提供・改善・開発・マーケティングのため</ListItem>
            <ListItem>
              お客さまの承諾・申込みに基づく、提携事業者・団体等への個人情報の提供のため
            </ListItem>
            <ListItem>利用規約等で禁じている行為などの調査のため</ListItem>
            <ListItem>その他個別に承諾いただいた目的</ListItem>
          </UnorderedList>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            個人情報の管理
          </Text>
          <Text fontSize={"md"}>
            当サイトは、個人情報の正確性及び安全確保のために、セキュリティ対策を徹底し、個人情報の漏洩、改ざん、不正アクセスなどの危険については、必要かつ適切なレベルの安全対策を実施します。
            <br />
            当サイトは、第三者に重要な情報を読み取られたり、改ざんされたりすることを防ぐために、SSLによる暗号化を使用しております。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            個人情報の第三者提供
          </Text>
          <Text fontSize={"md"}>
            当サイトは、以下を含む正当な理由がある場合を除き、個人情報を第三者に提供することはありません。
          </Text>
          <UnorderedList>
            <ListItem>ご本人の同意がある場合</ListItem>
            <ListItem>法令に基づく場合</ListItem>
            <ListItem>人の生命・身体・財産の保護に必要な場合</ListItem>
            <ListItem>公衆衛生・児童の健全育成に必要な場合</ListItem>
            <ListItem>国の機関等の法令の定める事務への協力の場合（税務調査、統計調査等）</ListItem>
          </UnorderedList>
          <Text fontSize={"md"}>
            当サイトでは、利用目的の達成に必要な範囲内において、他の事業者へ個人情報を委託することがあります。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            個人情報に関するお問い合わせ
          </Text>
          <Text fontSize={"md"}>
            開示、訂正、利用停止等のお申し出があった場合には、所定の方法に基づき対応致します。具体的な方法については、個別にご案内しますので、お問い合わせください。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            Cookie（クッキー）
          </Text>
          <Text fontSize={"md"}>
            Cookie（クッキー）は、利用者のサイト閲覧履歴を、利用者のコンピュータに保存しておく仕組みです。
            <br />
            利用者はCookie（クッキー）を無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。ただし、Cookie（クッキー）を拒否した場合、当サイトのいくつかのサービス・機能が正しく動作しない場合があります。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            アクセス解析
          </Text>
          <Text fontSize={"md"}>
            当サイトでは、サイトの分析と改善のためにGoogleが提供している「Googleアナリティクス」を利用しています。
            <br />
            このサービスは、トラフィックデータの収集のためにCookie（クッキー）を使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </Text>
          <br />
          {/*
          <Text as={"h1"} fontSize={"xl"}>
            広告配信
          </Text>
          <Text fontSize={"md"}>
            当サイトは、第三者配信の広告サービス「Google アドセンス」を利用しています。
            <br />
            広告配信事業者は、利用者の興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。これによって利用者のブラウザを識別できるようになりますが、個人を特定するものではありません。
            <br />
            Cookie（クッキー）を無効にする方法や「Googleアドセンス」に関する詳細は、
            <Link href="https://policies.google.com/technologies/ads?gl=jp">
              https://policies.google.com/technologies/ads?gl=jp
            </Link>
            をご覧ください。
          </Text>
          <br />
          */}
          <Text as={"h1"} fontSize={"xl"}>
            免責事項
          </Text>
          <Text fontSize={"md"}>
            当サイトのコンテンツ・情報について、可能な限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            <br />
            当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            著作権・肖像権
          </Text>
          <Text fontSize={"md"}>
            当サイトで掲載しているすべてのコンテンツ（文章、画像、動画、音声、ファイル等）の著作権・肖像権等は当サイト所有者または各権利所有者が保有し、許可なく無断利用（転載、複製、譲渡、二次利用等）することを禁止します。また、コンテンツの内容を変形・変更・加筆修正することも一切認めておりません。ただし、当サイトの機能により作成された画像(漢字テスト画像)を除きます。
            <br />
            各権利所有者におかれましては、万一掲載内容に問題がございましたら、ご本人様よりお問い合わせください。迅速に対応いたします。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            リンク
          </Text>
          <Text fontSize={"md"}>
            当サイトは原則リンクフリーです。リンクを行う場合の許可や連絡は不要です。引用する際は、引用元の明記と該当ページへのリンクをお願いします。
            <br />
            ただし、画像ファイルへの直リンク、インラインフレームを使用したHTMLページ内で表示する形でのリンクはご遠慮ください。
          </Text>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            本プライバシーポリシーの変更
          </Text>
          <Text fontSize={"md"}>
            当サイトは、本プライバシーポリシーの内容を適宜見直し、その改善に努めます。
            本プライバシーポリシーは、事前の予告なく変更することがあります。
            本プライバシーポリシーの変更は、当サイトに掲載された時点で有効になるものとします。
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={"blue"} mr={3} onClick={props.onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrivacyPolicyModal;
